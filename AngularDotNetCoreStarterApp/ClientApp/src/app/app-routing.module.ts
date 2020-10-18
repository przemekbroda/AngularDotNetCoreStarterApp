import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  {path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
