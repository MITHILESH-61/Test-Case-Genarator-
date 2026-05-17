const parsePackageJson = (scan) => {
  const packageFile = scan.files.find((file) => file.path.endsWith('package.json'));

  if (!packageFile?.content) {
    return {};
  }

  try {
    return JSON.parse(packageFile.content);
  } catch {
    return {};
  }
};

export const detectTechnologies = (scan) => {
  const technologies = new Set();
  const packageJson = parsePackageJson(scan);
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };
  const dependencyNames = Object.keys(dependencies || {});
  const hasDependency = (name) => dependencyNames.includes(name);

  if (hasDependency('react')) technologies.add('React');
  if (hasDependency('vite')) technologies.add('Vite');
  if (hasDependency('express')) technologies.add('Express.js');
  if (hasDependency('mongoose')) technologies.add('Mongoose');
  if (hasDependency('mongodb')) technologies.add('MongoDB');
  if (hasDependency('typescript') || scan.files.some((file) => ['.ts', '.tsx'].includes(file.extension))) {
    technologies.add('TypeScript');
  }
  if (scan.files.some((file) => ['.js', '.jsx', '.mjs', '.cjs'].includes(file.extension))) {
    technologies.add('JavaScript');
  }
  if (scan.files.some((file) => file.content.includes('express()'))) {
    technologies.add('Node.js');
    technologies.add('Express.js');
  }
  if (scan.files.some((file) => file.content.includes('mongoose.Schema'))) {
    technologies.add('MongoDB');
    technologies.add('Mongoose');
  }

  return [...technologies];
};

