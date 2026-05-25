import { severityClasses } from '../utils/severity';

export function SeverityBadge({ severity }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${severityClasses(severity)}`}>
      {severity}
    </span>
  );
}
