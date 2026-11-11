import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, defer, finalize, map, Observable, of, shareReplay, tap } from 'rxjs';
import { AuthResponse, LoginRequest } from './auth.models';
import { environment } from '@/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/auth/web`;

    private refreshRequest$: Observable<string> | null = null;

    readonly accessToken = signal<string | null>(null);

    readonly isAuthenticated = signal(false);

    login(username: string, password: string): Observable<void> {
        const request: LoginRequest = { username, password };
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request, { withCredentials: true }).pipe(
            tap((response) => this.setToken(response.accessToken)),
            map(() => void 0)
        );
    }

    refresh(): Observable<string> {
        if (!this.refreshRequest$) {
            const request$ = defer(() => this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })).pipe(
                map((response) => response.accessToken),
                tap((token) => this.setToken(token)),
                finalize(() => {
                    if (this.refreshRequest$ === request$) {
                        this.refreshRequest$ = null;
                    }
                }),
                shareReplay({ bufferSize: 1, refCount: false })
            );
            this.refreshRequest$ = request$;
        }
        return this.refreshRequest$;
    }

    restoreSession(): Observable<boolean> {
        return this.refresh().pipe(
            map(() => true),
            catchError(() => {
                this.clearSession();
                return of(false);
            })
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(finalize(() => this.clearSession()));
    }

    clearSession(): void {
        this.accessToken.set(null);
        this.isAuthenticated.set(false);
    }

    private setToken(token: string): void {
        this.accessToken.set(token);
        this.isAuthenticated.set(true);
    }
}
