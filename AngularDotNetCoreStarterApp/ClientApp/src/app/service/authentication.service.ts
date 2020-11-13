import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtDecoder } from '../helper/JwtDecoder';
import { Token } from '../model/token.model';
import { AuthenticationRepositoryService } from '../repository/authentication-repository.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUsernameSubject = new BehaviorSubject<string>(null);
  username = this.currentUsernameSubject.asObservable();

  private newAccessTokenSubject = new Subject<string>();
  newAccessToken = this.newAccessTokenSubject.asObservable();

  constructor(private authenticationRepository: AuthenticationRepositoryService) {
    this.currentUsernameSubject.next(this.getUsernameFromToken());
  }

  authenticate(username: string, password: string) {
    return this.authenticationRepository.signIn(username, password).pipe(
      tap(response => {
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('accessToken', response.accessToken);

        this.newAccessTokenSubject.next(this.getAccessToken());
        this.currentUsernameSubject.next(this.getUsernameFromToken());
      }),
      map(_ => true)
    );
  }

  isAuthenticated() {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    if (!refreshToken || !accessToken) {
      return of(false);
    }

    const refreshT = JwtDecoder.decodeJwt<Token>(refreshToken);
    if (new Date().getTime() / 1000 > refreshT.exp) {
      return of(false);
    }

    const jwt = JwtDecoder.decodeJwt<Token>(accessToken);
    if (new Date().getTime() / 1000 > jwt.exp) {
      return this.refreshAccessToken().pipe(
        map(_ => true),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            const e = err as HttpErrorResponse;
            if (e.status === 400) {
              this.logout();
            }
          }

          return of(false);
        }),
      );
    }

    return of(true);
  }

  refreshAccessToken() {
    return this.authenticationRepository.refreshAccessToken(this.getRefreshToken()).pipe(
      tap(response => {
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('accessToken', response.accessToken);

        this.newAccessTokenSubject.next(this.getAccessToken());
        this.currentUsernameSubject.next(this.getUsernameFromToken());
      }),
      map(response => response.accessToken)
    );
  }

  logout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');

    this.newAccessTokenSubject.next(null);
    this.currentUsernameSubject.next(null);
  }

  register(username: string, password: string) {
    return this.authenticationRepository.signUp(username, password).pipe(map(response => {
      return;
    }));
  }

  private getUsernameFromToken(): string {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      const jwt = JwtDecoder.decodeJwt<Token>(accessToken);
      return jwt.unique_name;
    }

    return null;
  }

  getAccessToken() {
    return localStorage.getItem('accessToken') as string;
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken') as string;
  }
}
