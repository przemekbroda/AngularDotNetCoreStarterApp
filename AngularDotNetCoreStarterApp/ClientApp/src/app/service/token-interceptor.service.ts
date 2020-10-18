import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.createRequestWithToken(req, this.authService.getAccessToken())).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && (err as HttpErrorResponse).status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(err);
        }
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (this.refreshTokenInProgress) {
      return this.authService.newAccessToken.pipe(
        take(1),
        switchMap(accessToken => {
          this.refreshTokenInProgress = false;

          return next.handle(this.createRequestWithToken(req, accessToken));
        })
      );
    } else {
      this.refreshTokenInProgress = true;

      return this.authService.refreshAccessToken().pipe(take(1), switchMap(accessToken => {
        this.refreshTokenInProgress = false;

        return next.handle(this.createRequestWithToken(req, accessToken)).pipe(catchError(err => {
          if (err instanceof HttpErrorResponse && (err as HttpErrorResponse).status === 401) {
            this.authService.logout();
            this.router.navigate(['']);
          }

          return throwError(err);
        }));
      }));
    }
  }

  private createRequestWithToken(req: HttpRequest<any>, token: string) {
    if (!token) {
      return req;
    }

    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
