import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RepeatedValueValidatorDirective } from '../../directive/repeated-value-validator.directive';


@NgModule({
  declarations: [AuthComponent, RegisterComponent, RepeatedValueValidatorDirective],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
  ]
})
export class AuthModule { }
