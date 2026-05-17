export const summarizeFolderStructure = (scan) => {
  return scan.files
    .map((file) => file.path)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 300);
};

export const buildRepositorySummary = ({ scan, technologies, routes, models, services }) => {
  return [
    `Scanned ${scan.files.length} files.`,
    technologies.length ? `Detected technologies: ${technologies.join(', ')}.` : 'No supported technology markers were detected.',
    routes.length ? `Detected ${routes.length} route definitions or API calls.` : 'No routes were detected.',
    models.length ? `Detected ${models.length} database model markers.` : 'No database models were detected.',
    services.length ? `Detected ${services.length} service-layer files.` : 'No service-layer files were detected.'
  ].join(' ');
};

export const buildArchitectureSummary = ({ technologies, routes, models, services }) => {
  const frontend = technologies.includes('React') ? 'React frontend detected' : 'Frontend framework not clearly identified';
  const backend = technologies.includes('Express.js') ? 'Express backend detected' : 'Backend framework not clearly identified';
  const database = technologies.includes('MongoDB') || technologies.includes('Mongoose')
    ? 'MongoDB/Mongoose persistence detected'
    : 'Database layer not clearly identified';

  return [
    frontend,
    backend,
    database,
    `${routes.length} routes/API calls, ${models.length} model markers, and ${services.length} service files were found.`
  ].join('. ');
};

