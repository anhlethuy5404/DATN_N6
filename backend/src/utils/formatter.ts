export const formatMessage = (message: string, prefix: string = 'LOG'): string => {
  return `[${prefix}] ${new Date().toISOString()} - ${message}`;
};

export const formatObject = <T>(obj: T): string => {
  return JSON.stringify(obj, null, 2);
};
