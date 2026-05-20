import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    /**
     * Constructor
     */
    constructor(private _authService: AuthService)
    {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
{
    // Clone request
    let newReq = req.clone();

    // Add access token if not expired
    if (
        this._authService.accessToken &&
        !AuthUtils.isTokenExpired(this._authService.accessToken)
    )
    {
        newReq = req.clone({
            headers: req.headers.set(
                'Authorization',
                'Bearer ' + this._authService.accessToken
            )
        });
    }

    return next.handle(newReq).pipe(

        catchError((error) => {

            // Handle 401
            if (
                error instanceof HttpErrorResponse &&
                error.status === 401 &&
                !req.url.includes('/auth/login') &&
                !req.url.includes('/auth/refresh')
            )
            {
                // Call refresh token API
                return this._authService.refreshsignIn().pipe(

                    switchMap((response: any) => {

                        // Save new access token
                        this._authService.accessToken =
                            response.accessToken;

                        // OPTIONAL:
                        // If API returns new refresh token
                        if (response.refreshToken)
                        {
                            localStorage.setItem(
                                'refreshToken',
                                response.refreshToken
                            );
                        }

                        // Retry original request
                        const retryReq = req.clone({
                            headers: req.headers.set(
                                'Authorization',
                                'Bearer ' + response.accessToken
                            )
                        });

                        return next.handle(retryReq);
                    }),

                    catchError((refreshError) => {

                        // Refresh token failed
                        this._authService.signOut();

                        location.reload();

                        return throwError(() => refreshError);
                    })
                );
            }

            return throwError(() => error);
        })
    );
}
}
