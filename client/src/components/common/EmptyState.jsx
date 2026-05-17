export const EmptyState = ({ title, description, action }) => (
  <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
    <h3 className="text-base font-semibold">{title}</h3>
    {description ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p> : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
);

