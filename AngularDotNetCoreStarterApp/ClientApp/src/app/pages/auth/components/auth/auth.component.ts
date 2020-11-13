import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  login: string;
  password: string;

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().pipe(take(1)).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['main'], {relativeTo: this.route});
      }
    });
  }

  onLogin(): void {
    this.authService.authenticate(this.login, this.password).subscribe(_ => {
      this.router.navigate(['main'], {relativeTo: this.route});
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if ((err as HttpErrorResponse).status === 400) {
          this.snackbar.open('Wrong username or password', 'OK', {duration: 3000});
        } else {
          this.snackbar.open('An error occured', 'OK', {duration: 3000});
        }
      }
    });
  }

  onRegister() {
    this.router.navigate(['.', 'register'], {relativeTo: this.route});
  }
}
