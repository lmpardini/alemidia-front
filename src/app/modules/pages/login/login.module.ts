import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { PrimeiroAcessoComponent } from './primeiro-acesso/primeiro-acesso.component';


@NgModule({
  declarations: [
    LoginComponent,
    PrimeiroAcessoComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatCardModule
  ]
})
export class LoginModule { }
