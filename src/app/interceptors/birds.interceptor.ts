import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const birdsInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const apiUri = `http://34.243.118.68:3000`;
  const gatewayUri = `https://190mnbm8j2.execute-api.eu-west-1.amazonaws.com`;

  const jwt = localStorage.getItem('token');

  if ((req.url.startsWith(apiUri) || req.url.startsWith(gatewayUri)) && jwt != '') {
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
