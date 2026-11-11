import { inject } from '@angular/core';
import {
    HttpErrorResponse,
    HttpInterceptorFn
} from '@angular/common/http';
import {
    catchError,
    switchMap,
    throwError
} from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '@/environments/environment';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;
const AUTH_URL = `${API_URL}/auth/web/`;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!req.url.startsWith(API_URL)) {
        return next(req);
    }
    if (req.url.startsWith(AUTH_URL)) {
        return next(req);
    }
    const token = auth.accessToken();
    const withToken = (accessToken: string) =>
        req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    const authorizedReq = token ? withToken(token) : req;
    return next(authorizedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status !== 401) {
                return throwError(() => error);
            }
            const currentToken = auth.accessToken();
            if (token && currentToken && token !== currentToken) {
                return next(withToken(currentToken));
            }
            return auth.refresh().pipe(
                catchError(refreshError => {
                    auth.clearSession();
                    router.navigate(['/login'], {
                        replaceUrl: true
                    });
                    return throwError(() => refreshError);
                }),
                switchMap(newToken => next(withToken(newToken)))
            );
        })
    );
};
