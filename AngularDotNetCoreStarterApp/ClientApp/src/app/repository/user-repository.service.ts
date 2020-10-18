import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get<User[]>(`${environment.basicUrl}/api/User`);
  }
}
