import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login.component";
import { PrimeiroAcessoComponent } from "./primeiro-acesso/primeiro-acesso.component";

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'primeiro-acesso', component:PrimeiroAcessoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
