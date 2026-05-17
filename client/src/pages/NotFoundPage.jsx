import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';

export const NotFoundPage = () => (
  <main className="page-shell flex items-center justify-center px-4">
    <section className="surface max-w-md rounded-lg p-8 text-center">
      <h1 className="text-3xl font-black">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">The page you opened does not exist.</p>
      <Link to="/dashboard" className="mt-5 inline-block">
        <Button>Go to Dashboard</Button>
      </Link>
    </section>
  </main>
);

