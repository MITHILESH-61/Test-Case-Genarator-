export const Badge = ({ children, tone = 'slate' }) => {
  const tones = {
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
    red: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200'
  };

  return <span className={`rounded px-2 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
};

