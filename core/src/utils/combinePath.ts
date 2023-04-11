export const combinePath = (path: string, key: string): string => (path === '' ? key : `${path}.${key}`);
