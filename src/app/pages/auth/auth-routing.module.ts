import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {component: SignInComponent, path: 'login'},
  {component: SingUpComponent, path: 'registration'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
