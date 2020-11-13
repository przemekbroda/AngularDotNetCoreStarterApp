import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: NgForm;

  username: string;
  password: string;
  repeatedPassword: string;

  constructor(
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSignUp() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.username, this.password).subscribe(
      success => {
        this.router.navigate(['..'], {relativeTo: this.route});
      },
      err => {
        if (err instanceof HttpErrorResponse && err.status === 400) {
          this.snackbar.open('User with such username already exists', 'OK', {duration: 3000});
        }
      }
    );
  }

}
