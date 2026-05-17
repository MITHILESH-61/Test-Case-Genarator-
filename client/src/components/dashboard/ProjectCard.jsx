import { Link } from 'react-router-dom';
import { FolderKanban } from 'lucide-react';
import { Badge } from '../common/Badge.jsx';
import { Card } from '../common/Card.jsx';
import { formatDate, truncate } from '../../utils/formatters.js';

export const ProjectCard = ({ project }) => (
  <Card className="h-full">
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <div className="rounded-md bg-blue-100 p-2 text-brand dark:bg-blue-950">
          <FolderKanban size={20} />
        </div>
        <div className="min-w-0">
          <Link to={`/projects/${project._id}`} className="text-lg font-bold hover:text-brand">
            {project.projectName}
          </Link>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {truncate(project.repositorySummary || project.repositoryUrl || 'No repository analyzed yet.', 140)}
          </p>
        </div>
      </div>
      <Badge tone={project.sourceType === 'manual' ? 'slate' : 'green'}>{project.sourceType}</Badge>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {(project.detectedTechnologies || []).slice(0, 4).map((technology) => (
        <Badge key={technology} tone="blue">
          {technology}
        </Badge>
      ))}
    </div>
    <div className="mt-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
      <span>{project.generationCount || 0} generations</span>
      <span>{formatDate(project.updatedAt)}</span>
    </div>
  </Card>
);

