import { AlertCircle, CheckCircle2, CloudOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ToastHost() {
  const { toasts } = useApp();
  return (
    <div className="fixed right-4 top-20 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = toast.type === 'error' ? AlertCircle : toast.type === 'offline' ? CloudOff : CheckCircle2;
        return (
          <div key={toast.id} className="glass flex items-center gap-3 rounded-lg p-4 shadow-soft">
            <Icon className={toast.type === 'error' ? 'text-red-600' : 'text-leaf-600'} size={22} />
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
}
