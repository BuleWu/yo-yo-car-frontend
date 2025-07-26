export const snakeToCamelCase = (str: string) => {
  return str.replace(/([-_][a-z])/gi, (s: string) => {
    return s.toUpperCase().replace('-', '').replace('_', '');
  });
};
