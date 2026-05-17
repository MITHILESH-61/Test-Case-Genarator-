import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { Card } from '../components/common/Card.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { Input } from '../components/common/Input.jsx';
import { ProjectCard } from '../components/dashboard/ProjectCard.jsx';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';
import { useProjectStore } from '../store/projectStore.js';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const projects = useProjectStore((state) => state.projects);
  const loading = useProjectStore((state) => state.loading);
  const error = useProjectStore((state) => state.error);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const createProject = useProjectStore((state) => state.createProject);
  const [form, setForm] = useState({ projectName: '', repositoryUrl: '' });

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const project = await createProject(form);
    setForm({ projectName: '', repositoryUrl: '' });
    navigate(`/projects/${project._id}`);
  };

  return (
    <DashboardLayout>
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <Card>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Create a workspace, then attach repository context and generate tests.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <Input
              label="Project Name"
              value={form.projectName}
              onChange={(event) => setForm((current) => ({ ...current, projectName: event.target.value }))}
              required
            />
            <Input
              label="Repository URL"
              value={form.repositoryUrl}
              onChange={(event) => setForm((current) => ({ ...current, repositoryUrl: event.target.value }))}
              placeholder="Optional GitHub URL"
            />
            {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{error}</p> : null}
            <Button type="submit" disabled={!form.projectName.trim() || loading}>
              <Plus size={16} />
              Create Project
            </Button>
          </form>
        </Card>
        <section>
          <div className="mb-4 grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="label">Projects</p>
              <p className="mt-2 text-3xl font-black">{projects.length}</p>
            </Card>
            <Card>
              <p className="label">Analyzed</p>
              <p className="mt-2 text-3xl font-black">{projects.filter((item) => item.repositorySummary).length}</p>
            </Card>
            <Card>
              <p className="label">Generations</p>
              <p className="mt-2 text-3xl font-black">{projects.reduce((sum, item) => sum + (item.generationCount || 0), 0)}</p>
            </Card>
          </div>
          {projects.length ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState title="No projects yet" description="Create a project to begin repository-aware test generation." />
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

