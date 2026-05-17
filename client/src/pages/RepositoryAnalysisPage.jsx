import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnalysisSummary } from '../components/repository/AnalysisSummary.jsx';
import { WorkspaceLayout } from '../layouts/WorkspaceLayout.jsx';
import { useProjectStore } from '../store/projectStore.js';

export const RepositoryAnalysisPage = () => {
  const { id } = useParams();
  const currentProject = useProjectStore((state) => state.currentProject);
  const loading = useProjectStore((state) => state.loading);
  const error = useProjectStore((state) => state.error);
  const fetchProject = useProjectStore((state) => state.fetchProject);

  useEffect(() => {
    fetchProject(id);
  }, [id, fetchProject]);

  return (
    <WorkspaceLayout title={`${currentProject?.projectName || 'Project'} Analysis`}>
      {error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{error}</p> : null}
      {loading ? <p className="text-sm text-slate-600 dark:text-slate-400">Loading analysis...</p> : <AnalysisSummary project={currentProject} />}
    </WorkspaceLayout>
  );
};

