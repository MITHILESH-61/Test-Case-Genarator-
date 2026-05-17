export const Input = ({ label, error, className = '', ...props }) => (
  <label className="block space-y-1">
    {label ? <span className="label">{label}</span> : null}
    <input className={`field ${className}`} {...props} />
    {error ? <span className="text-xs text-red-600">{error}</span> : null}
  </label>
);

