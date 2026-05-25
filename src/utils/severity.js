export function severityClasses(severity) {
  const key = String(severity).toLowerCase();
  if (key === 'high') return 'bg-red-100 text-red-700 ring-red-200 dark:bg-red-950 dark:text-red-200';
  if (key === 'medium') return 'bg-amber-100 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-200';
  return 'bg-leaf-100 text-leaf-700 ring-leaf-200 dark:bg-leaf-950 dark:text-leaf-200';
}
