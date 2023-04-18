export const ApiPath = (path: string) => {
  const basePath = process.env.API_VERSION || 'v1';

  if (!path) {
    return basePath;
  }

  const formattedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${formattedPath}`;
};