import { Badge } from '../common/Badge.jsx';
import { Card } from '../common/Card.jsx';
import { EmptyState } from '../common/EmptyState.jsx';

export const AnalysisSummary = ({ project }) => {
  if (!project?.repositorySummary) {
    return <EmptyState title="No analysis available" description="Upload a ZIP or import a GitHub repository to populate this view." />;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <Card>
        <h2 className="text-lg font-bold">Detected Technologies</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.detectedTechnologies || []).map((item) => (
            <Badge key={item} tone="blue">
              {item}
            </Badge>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="text-lg font-bold">Architecture Summary</h2>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{project.architectureSummary}</p>
      </Card>
      <Card>
        <h2 className="text-lg font-bold">Routes</h2>
        <ul className="mt-3 max-h-72 space-y-2 overflow-auto text-sm">
          {(project.detectedRoutes || []).map((route) => (
            <li key={route} className="rounded bg-slate-100 px-2 py-1 font-mono dark:bg-slate-800">
              {route}
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="text-lg font-bold">Models And Services</h2>
        <div className="mt-3 grid gap-4 text-sm">
          <div>
            <p className="font-semibold">Models</p>
            <ul className="mt-2 space-y-1">
              {(project.detectedModels || []).map((model) => (
                <li key={model}>{model}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">Services</p>
            <ul className="mt-2 space-y-1">
              {(project.detectedServices || []).map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
      <Card className="lg:col-span-2">
        <h2 className="text-lg font-bold">Folder Structure</h2>
        <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
          {(project.folderStructure || []).join('\n')}
        </pre>
      </Card>
    </div>
  );
};

