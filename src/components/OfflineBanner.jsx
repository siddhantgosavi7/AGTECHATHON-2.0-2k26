import { CloudOff, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function OfflineBanner() {
  const { offline, setOffline, notify } = useApp();
  if (!offline) return null;
  return (
    <div className="sticky top-16 z-40 border-y border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-sm">
        <span className="flex items-center gap-2">
          <CloudOff size={18} /> Offline mode: uploads are queued and will sync later.
        </span>
        <button
          onClick={() => {
            setOffline(false);
            notify('Pending uploads synced successfully.');
          }}
          className="inline-flex items-center gap-2 font-bold"
        >
          <RefreshCw size={16} /> Sync now
        </button>
      </div>
    </div>
  );
}
