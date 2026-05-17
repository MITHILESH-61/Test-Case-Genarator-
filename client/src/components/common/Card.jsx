export const Card = ({ children, className = '' }) => (
  <section className={`surface rounded-lg p-5 ${className}`}>{children}</section>
);

