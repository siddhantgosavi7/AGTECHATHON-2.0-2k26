import { Camera, ImagePlus, UploadCloud, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';

export function FileUploader({ onFile, loading = false }) {
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraStatus, setCameraStatus] = useState('');

  useEffect(() => {
    if (cameraOpen && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch(() => {
        setError('Camera preview could not start. Please use upload from gallery.');
      });
    }
  }, [cameraOpen, cameraStream]);

  useEffect(() => () => stopCamera(), []);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose a valid image file.');
      return;
    }
    setError('');
    setPreview(URL.createObjectURL(file));
    onFile(file);
  };

  const openCamera = () => {
    setError('');
    setCameraStatus('Starting camera...');
    setCameraOpen(true);
    window.setTimeout(() => {
      startCamera();
    }, 150);
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraStatus('Camera capture is not available in this browser. Please upload from gallery.');
      return;
    }

    try {
      const stream = await withTimeout(
        navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        }),
        8000,
      );
      setCameraStream(stream);
      setCameraStatus('');
    } catch {
      setCameraStatus('Camera permission was blocked, timed out, or no camera was found. Please allow camera access or upload from gallery.');
    }
  };

  const stopCamera = () => {
    setCameraStream((stream) => {
      stream?.getTracks().forEach((track) => track.stop());
      return null;
    });
  };

  const closeCamera = () => {
    stopCamera();
    setCameraOpen(false);
  };

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) {
      setError('Camera is still starting. Please try capture again.');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError('Could not capture image. Please try again.');
          return;
        }
        const file = new File([blob], `camera-leaf-${Date.now()}.jpg`, { type: 'image/jpeg' });
        closeCamera();
        handleFile(file);
      },
      'image/jpeg',
      0.92,
    );
  };

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        handleFile(event.dataTransfer.files?.[0]);
      }}
      className="rounded-lg border-2 border-dashed border-leaf-200 bg-leaf-50/70 p-5 text-center dark:border-leaf-800 dark:bg-leaf-950/30"
    >
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          if (cameraOpen) closeCamera();
          handleFile(event.target.files?.[0]);
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(event) => {
          if (cameraOpen) closeCamera();
          handleFile(event.target.files?.[0]);
        }}
      />
      {preview ? (
        <img src={preview} alt="Uploaded crop preview" className="mx-auto h-64 w-full rounded-lg object-cover" />
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3">
          <UploadCloud size={44} className="text-leaf-600" />
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Drop a crop leaf image here</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Clear, close-up photos improve AI confidence.</p>
          </div>
        </div>
      )}
      {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-red-950 dark:text-red-200">{error}</p>}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button type="button" disabled={loading} onClick={() => galleryInputRef.current?.click()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-600 px-4 font-bold text-white disabled:opacity-60">
          <ImagePlus size={19} /> Upload from gallery
        </button>
        <button type="button" disabled={loading} onClick={openCamera} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-4 font-bold text-leaf-800 ring-1 ring-leaf-200 disabled:opacity-60 dark:bg-slate-900 dark:text-leaf-100 dark:ring-white/10">
          <Camera size={19} /> Capture with camera
        </button>
      </div>
      <Button type="button" variant="ghost" className="mt-3 w-full" disabled={loading} onClick={() => handleFile(createDemoFile())}>
        Try demo diagnosis
      </Button>
      {cameraOpen && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/75 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-soft dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-left">
                <h2 className="text-lg font-black text-slate-950 dark:text-white">Capture crop leaf</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Keep the leaf inside the frame and avoid glare.</p>
              </div>
              <button type="button" onClick={closeCamera} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Close camera">
                <X />
              </button>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-slate-950">
              <video ref={videoRef} playsInline muted className="max-h-[65vh] w-full object-contain" />
              {cameraStatus && (
                <div className="absolute inset-0 grid place-items-center bg-slate-950/76 p-6 text-center">
                  <p className="max-w-sm text-sm font-semibold text-white">{cameraStatus}</p>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button type="button" onClick={captureFrame} disabled={!cameraStream}>
                <Camera size={18} /> Capture photo
              </Button>
              <Button type="button" variant="secondary" onClick={() => galleryInputRef.current?.click()}>
                <ImagePlus size={18} /> Gallery
              </Button>
              <Button type="button" variant="secondary" onClick={() => cameraInputRef.current?.click()}>
                <Camera size={18} /> Device camera
              </Button>
              <Button type="button" variant="secondary" onClick={closeCamera}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const id = window.setTimeout(() => reject(new Error('Camera request timed out.')), ms);
    promise.then(
      (value) => {
        window.clearTimeout(id);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(id);
        reject(error);
      },
    );
  });
}

function createDemoFile() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
    <rect width="900" height="620" fill="#e7f6df"/>
    <path d="M450 54C232 144 142 318 218 448c68 116 226 134 342 48 122-90 158-268-110-442Z" fill="#2f8f45"/>
    <path d="M450 88c-8 132-38 276-132 402" fill="none" stroke="#d9f5c9" stroke-width="14" stroke-linecap="round"/>
    <g fill="#7b3f25" opacity=".88">
      <circle cx="500" cy="272" r="42"/><circle cx="574" cy="350" r="30"/><circle cx="406" cy="386" r="36"/><circle cx="344" cy="294" r="24"/>
    </g>
    <g fill="none" stroke="#f0d36a" stroke-width="10" opacity=".9">
      <circle cx="500" cy="272" r="52"/><circle cx="406" cy="386" r="45"/>
    </g>
  </svg>`;
  return new File([svg], 'demo-tomato-leaf.svg', { type: 'image/svg+xml' });
}
