const MONGOOSE_MODEL_PATTERN = /mongoose\.model\(\s*['"`]([^'"`]+)['"`]/gi;
const SCHEMA_PATTERN = /new\s+mongoose\.Schema|new\s+Schema/i;

export const detectModels = (scan) => {
  const models = new Set();

  for (const file of scan.files) {
    if (!file.content) {
      continue;
    }

    for (const match of file.content.matchAll(MONGOOSE_MODEL_PATTERN)) {
      models.add(`${match[1]} (${file.path})`);
    }

    if (SCHEMA_PATTERN.test(file.content) && ![...models].some((model) => model.includes(file.path))) {
      models.add(`Schema detected (${file.path})`);
    }
  }

  return [...models];
};

export const detectServices = (scan) => {
  return scan.files
    .filter((file) => /(^|\/)services?\//i.test(file.path) || /\.service\.[jt]sx?$/i.test(file.path))
    .map((file) => file.path)
    .slice(0, 100);
};
