import { isObject } from '../type-checks/is-object';
import { camelToSnakeCase } from '../string-manipulation/camel-to-snake-case';

export const deepObjCamelToSnakeCase = (obj: any): any => {
  if (isObject(obj)) {
    const result: any = {};

    Object.keys(obj || {}).forEach((key) => {
      const snakeKey = camelToSnakeCase(key);
      result[snakeKey] = deepObjCamelToSnakeCase(obj[key]);
    });

    return result;
  } else if (Array.isArray(obj)) {
    return obj.map(deepObjCamelToSnakeCase);
  }

  return obj;
};
