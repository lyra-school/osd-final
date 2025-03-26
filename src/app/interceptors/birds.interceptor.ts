import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const birdsInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const apiUri = `http://localhost:3000/`;

  const jwt = localStorage.getItem('token');

  if (req.url.startsWith(apiUri) && jwt != '') {
    const authRequest = req.clone({
      setHeaders: { authorization: `Bearer ${jwt}` },
    });

    return next(authRequest).pipe(
      catchError((err) => {
        console.log('Request failed ' + err.status);
        {
        }
        return throwError(() => err);
      })
    );
  } else {
    return next(req);
  }
};
