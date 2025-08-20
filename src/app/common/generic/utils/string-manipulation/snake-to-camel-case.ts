export const snakeToCamelCase = (str: string) => {
  return str.replace(/([-_][a-z0-9])/gi, (s: string) => {
    return s.toUpperCase().replace('-', '').replace('_', '');
  });
};
