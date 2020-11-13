import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationRepositoryService {

  constructor(private http: HttpClient) { }

  public signIn(username: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${environment.basicUrl}/api/Authentication/SignIn`, {username: username, password: password});
  }

  public signUp(username: string, password: string) {
    return this.http.post<SignUpResponse>(`${environment.basicUrl}/api/Authentication/SignUp`, {username: username, password: password});
  }

  public refreshAccessToken(refreshToken: string) {
    return this.http.post<RefreshAccessTokenResponse>(`${environment.basicUrl}/api/Authentication/RefreshToken`,
    {refreshToken: refreshToken});
  }

}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshAccessTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpResponse {
  id: number;
  username: string;
}
