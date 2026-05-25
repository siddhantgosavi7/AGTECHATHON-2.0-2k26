export function Button({ as: Tag = 'button', variant = 'primary', className = '', children, ...props }) {
  const variants = {
    primary: 'bg-leaf-600 text-white hover:bg-leaf-700 shadow-lg shadow-leaf-900/10',
    secondary: 'bg-white text-leaf-800 hover:bg-leaf-50 ring-1 ring-leaf-200 dark:bg-slate-900 dark:text-leaf-100 dark:ring-white/10',
    ghost: 'text-slate-700 hover:bg-leaf-50 dark:text-slate-200 dark:hover:bg-white/10',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <Tag
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
