import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // clone request to add auth token
  const authReq = req.clone({
    setHeaders: {
      // Authorization: 'Bearer TOKEN'
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.log(req.url);
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
