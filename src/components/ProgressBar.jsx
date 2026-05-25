export function ProgressBar({ value, label }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <span className="font-bold text-leaf-700 dark:text-leaf-300">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full rounded-full bg-leaf-600 transition-all duration-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
