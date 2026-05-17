export const Textarea = ({ label, error, className = '', ...props }) => (
  <label className="block space-y-1">
    {label ? <span className="label">{label}</span> : null}
    <textarea className={`field min-h-28 resize-y ${className}`} {...props} />
    {error ? <span className="text-xs text-red-600">{error}</span> : null}
  </label>
);

