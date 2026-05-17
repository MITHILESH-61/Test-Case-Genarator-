import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout.jsx';

export const WorkspaceLayout = ({ children, title, actions }) => (
  <DashboardLayout>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
          <ArrowLeft size={16} />
          Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-bold">{title}</h1>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
    {children}
  </DashboardLayout>
);

