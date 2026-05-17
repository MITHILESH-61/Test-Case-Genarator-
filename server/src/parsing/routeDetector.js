const EXPRESS_ROUTE_PATTERN = /(?:app|router)\.(get|post|put|patch|delete)\(\s*['"`]([^'"`]+)['"`]/gi;
const CLIENT_API_PATTERN = /(?:axios|fetch)\s*(?:\.\w+)?\(\s*['"`]([^'"`]+)['"`]/gi;

export const detectRoutes = (scan) => {
  const routes = new Set();

  for (const file of scan.files) {
    if (!file.content) {
      continue;
    }

    for (const match of file.content.matchAll(EXPRESS_ROUTE_PATTERN)) {
      routes.add(`${match[1].toUpperCase()} ${match[2]} (${file.path})`);
    }

    for (const match of file.content.matchAll(CLIENT_API_PATTERN)) {
      if (match[1].startsWith('/api') || match[1].startsWith('http')) {
        routes.add(`CLIENT ${match[1]} (${file.path})`);
      }
    }
  }

  return [...routes];
};

