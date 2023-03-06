import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesModule) },
  { path: 'buffets', loadChildren: () => import('./buffet/buffet.module').then( m => m.BuffetModule) },
  { path: 'assessores', loadChildren: () => import('./assessor/assessor.module').then( m => m.AssessorModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
