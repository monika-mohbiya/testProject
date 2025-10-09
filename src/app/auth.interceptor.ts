import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("Access Token:")
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    })
    return next(cloned);
  } else {
    return next(req);
  }

};
