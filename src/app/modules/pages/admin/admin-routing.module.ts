import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: 'usuarios', loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioModule) },
  { path: 'dados-empresa', loadChildren: () => import('./dados-empresa/dados-empresa.module').then( m => m.DadosEmpresaModule) },
  { path: 'colaboradores', loadChildren: () => import('./colaborador/colaborador.module').then( m => m.ColaboradorModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
