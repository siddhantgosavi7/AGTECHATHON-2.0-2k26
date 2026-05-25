import { Download, Save, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FileUploader } from '../components/FileUploader';
import { ProgressBar } from '../components/ProgressBar';
import { ReportModal } from '../components/ReportModal';
import { SeverityBadge } from '../components/SeverityBadge';
import { useApp } from '../context/AppContext';
import { apiAssetUrl, detectDisease, saveDiagnosis } from '../services/api';

export function DetectionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [modal, setModal] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState('');
  const [scanError, setScanError] = useState('');
  const { notify, setSavedReports } = useApp();

  const handleFile = async (file) => {
    setLoading(true);
    setResult(null);
    setScanError('');
    setUploadedPreview(URL.createObjectURL(file));
    try {
      const data = await detectDisease(file);
      setResult(data);
      notify('AI diagnosis completed.');
    } catch (error) {
      const message = error.message || 'Could not process image. Please try again.';
      setScanError(message);
      notify(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-wide text-leaf-600">AI Disease Detection</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">Scan a crop leaf and get a treatment plan</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <Card>
          <FileUploader onFile={handleFile} loading={loading} />
          {loading && (
            <div className="mt-5 rounded-lg bg-slate-50 p-4 dark:bg-slate-800" role="status" aria-live="polite">
              <p className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">Analyzing leaf image with AI...</p>
              <div className="skeleton mb-3 h-4 rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
          )}
        </Card>
        <Card>
          {scanError && !result && (
            <div className="grid gap-5">
              {uploadedPreview && <img src={uploadedPreview} alt="Uploaded crop leaf" className="h-72 w-full rounded-lg object-cover" />}
              <div className="rounded-lg bg-red-50 p-5 text-red-800 ring-1 ring-red-200 dark:bg-red-950 dark:text-red-100 dark:ring-red-900">
                <h2 className="text-xl font-black">AI analysis did not complete</h2>
                <p className="mt-2 text-sm font-semibold">{scanError}</p>
                <p className="mt-3 text-sm">Try a sharper leaf close-up in natural light. The app will no longer show a fake tomato diagnosis when analysis fails.</p>
              </div>
            </div>
          )}
          {!result && !loading && !scanError && <EmptyResult />}
          {result && (
            <div className="grid gap-5">
              {result.warning && (
                <p className="rounded-lg bg-amber-50 p-4 text-sm font-semibold text-amber-800 ring-1 ring-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:ring-amber-900">
                  {result.warning}
                </p>
              )}
              <div className="relative overflow-hidden rounded-lg">
                <img src={apiAssetUrl(result.imageUrl) || uploadedPreview} alt="Detected infected leaf area" className="h-72 w-full object-cover" />
                <div
                  className="absolute rounded-lg border-4 border-red-500 bg-red-500/20 shadow-[0_0_40px_rgba(239,68,68,.45)]"
                  style={{
                    left: `${result.boundingBox?.x ?? 38}%`,
                    top: `${result.boundingBox?.y ?? 28}%`,
                    width: `${result.boundingBox?.width ?? 32}%`,
                    height: `${result.boundingBox?.height ?? 28}%`,
                  }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Disease Name</p>
                  <h2 className="text-3xl font-black dark:text-white">{result.disease}</h2>
                </div>
                <SeverityBadge severity={result.severity} />
              </div>
              <ProgressBar label="Confidence Percentage" value={result.confidence} />
              <Info title="Crop affected" items={[result.crop]} />
              <Info title="Symptoms list" items={result.symptoms} />
              <p className="rounded-lg bg-leaf-50 p-4 text-slate-700 dark:bg-leaf-950 dark:text-slate-200">{result.description}</p>
              <Info title="Treatment Section" items={[...(result.treatment || []), ...(result.organicRemedies || []), ...(result.dosage || []), ...(result.safety || [])]} />
              <Info title="Prevention Tips Section" items={result.prevention} />
              <div className="grid gap-3 sm:grid-cols-3">
                <Button onClick={() => setModal(true)}><Download size={17} /> Download</Button>
                <Button variant="secondary" onClick={async () => { const saved = await saveDiagnosis(result); setSavedReports((reports) => [...reports, saved]); notify('Diagnosis saved.'); }}><Save size={17} /> Save</Button>
                <Button variant="secondary" onClick={() => notify('Share link copied.')}><Share2 size={17} /> Share</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
      <ReportModal report={modal ? result : null} onClose={() => setModal(false)} />
    </section>
  );
}

function Info({ title, items }) {
  return (
    <div>
      <h3 className="mb-2 font-black dark:text-white">{title}</h3>
      <div className="grid gap-2">
        {(items || []).map((item) => (
          <p key={item} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{item}</p>
        ))}
      </div>
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="grid min-h-[520px] place-items-center rounded-lg bg-slate-50 p-8 text-center dark:bg-slate-800">
      <div>
        <h2 className="text-2xl font-black dark:text-white">Results panel is ready</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Upload a leaf image to view disease name, severity, AI confidence, treatment, and prevention tips.</p>
      </div>
    </div>
  );
}
