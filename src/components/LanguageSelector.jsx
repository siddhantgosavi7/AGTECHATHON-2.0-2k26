import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  return (
    <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-900">
      <Languages size={18} className="text-leaf-600" />
      <span className="sr-only">Language</span>
      <select
        value={i18n.language}
        onChange={(event) => i18n.changeLanguage(event.target.value)}
        className="bg-transparent font-medium outline-none dark:text-white"
      >
        <option value="en">EN</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
      </select>
    </label>
  );
}
