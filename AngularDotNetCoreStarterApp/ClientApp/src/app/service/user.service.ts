import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { UserRepositoryService } from '../repository/user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersSubject = new BehaviorSubject<User[]>([]);
  public users = this.usersSubject.asObservable();

  constructor(private userRepo: UserRepositoryService) { }

  public getUsers() {
    return this.userRepo.getUsers().pipe(tap(users => {
      this.usersSubject.next(users);
    }));
  }
}
