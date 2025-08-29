import { HttpInterceptorFn } from '@angular/common/http';
import {deepObjCamelToSnakeCase} from '../common/generic/utils/data-manipulation/deep-obj-camel-to-snake-case';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let body = req.body;

  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    body = deepObjCamelToSnakeCase(body);
  }

  const modifiedReq = req.clone({ body })

  return next(modifiedReq);
};
