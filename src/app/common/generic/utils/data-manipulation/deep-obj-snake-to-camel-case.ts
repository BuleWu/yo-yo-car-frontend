import {isObject} from '../type-checks/is-object';
import {snakeToCamelCase} from '../string-manipulation/snake-to-camel-case';

export const deepObjSnakeToCamelCase = (obj: any) => {
  if(isObject(obj)) {
    const n: Object = {};

    Object.keys(obj || {}).forEach((k) => {
      n[snakeToCamelCase(k) as keyof Object] = deepObjSnakeToCamelCase(obj[k]);
    });

    return n;
  } else if(Array.isArray(obj)) {
    return obj.map((i): any => {
      return deepObjSnakeToCamelCase(i);
    })
  }

  return obj;
}
