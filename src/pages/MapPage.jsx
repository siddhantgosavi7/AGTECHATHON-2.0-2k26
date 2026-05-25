import { useEffect, useState } from 'react';
import { MapComponent } from '../components/MapComponent';
import { Card } from '../components/Card';

export function MapPage() {
  const [location, setLocation] = useState({ latitude: 18.5204, longitude: 73.8567 }); // Default: Pune
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          console.warn('Using default location:', err);
          // Keep default location
        }
      );
    }
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-wide text-leaf-600">Real-time Location</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">Find nearby resources</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Discover fertilizer shops, agricultural experts, and soil testing centers near you
        </p>
      </div>

      <MapComponent latitude={location.latitude} longitude={location.longitude} />
    </section>
  );
}
