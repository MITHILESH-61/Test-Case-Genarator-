import { Link } from 'react-router-dom';

export const AuthLayout = ({ children, title, subtitle }) => (
  <main className="page-shell flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-md">
      <Link to="/" className="mb-6 inline-block text-sm font-semibold text-brand">
        Test Case Generator
      </Link>
      <section className="surface rounded-lg p-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p> : null}
        <div className="mt-6">{children}</div>
      </section>
    </div>
  </main>
);

