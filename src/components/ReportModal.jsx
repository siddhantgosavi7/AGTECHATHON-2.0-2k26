import { X, Download } from 'lucide-react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { SeverityBadge } from './SeverityBadge';

export function ReportModal({ report, onClose }) {
  if (!report) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-soft dark:bg-slate-900">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">Crop Health Report</p>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">KrishiRakshak AI Diagnosis</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Close report">
            <X />
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Info label="Farmer" value="Prathamesh Chougale" />
          <Info label="Crop" value={report.crop} />
          <Info label="Disease" value={report.disease} />
          <Info label="Severity" value={<SeverityBadge severity={report.severity} />} />
          <Info label="Weather" value="29 C, 82% humidity" />
          <Info label="Suggested treatment" value={report.treatment?.[0]} />
        </div>
        <div className="mt-5">
          <ProgressBar label="AI confidence score" value={report.confidence} />
        </div>
        <Button className="mt-6 w-full" onClick={() => window.print()}>
          <Download size={18} /> Download Report
        </Button>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="mt-1 font-semibold text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}
