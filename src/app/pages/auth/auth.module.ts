import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule, TuiLinkModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { SingUpComponent } from './sing-up/sing-up.component';


@NgModule({
  declarations: [
    SignInComponent,
    SingUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiFieldErrorModule,
    TuiErrorModule,
    TuiLinkModule
  ]
})
export class AuthModule { }
