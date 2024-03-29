import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./modules/pages/login/login.module').then( m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./modules/pages/home/home.module').then( m => m.HomeModule) },
  { path: 'cadastros', loadChildren: () => import('./modules/pages/cadastro/cadastro.module').then( m => m.CadastroModule) },
  { path: 'admin', loadChildren:() => import('./modules/pages/admin/admin.module').then( m => m.AdminModule) },
  { path: 'contratos', loadChildren:() => import('./modules/pages/contrato/contrato.module').then(( m => m.ContratoModule)), data: {label: 'Contratos'} },
  { path: 'agenda', loadChildren:() => import('./modules/pages/agenda/agenda.module').then(( m => m.AgendaModule)) },
  { path: 'financeiro', loadChildren:() => import('./modules/pages/financeiro/financeiro.module').then(( m => m.FinanceiroModule)) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
