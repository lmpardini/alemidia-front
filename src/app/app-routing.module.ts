import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./modules/pages/login/login.module').then( m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./modules/pages/home/home.module').then( m => m.HomeModule) },
  { path: 'cadastros', loadChildren: () => import('./modules/pages/cadastro/cadastro.module').then( m => m.CadastroModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
