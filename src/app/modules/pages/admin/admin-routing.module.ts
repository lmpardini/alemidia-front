import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: 'usuarios', loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioModule) },
  { path: 'dados-empresa', loadChildren: () => import('./dados-empresa/dados-empresa.module').then( m => m.DadosEmpresaModule) },
  { path: 'colaboradores', loadChildren: () => import('./colaborador/colaborador.module').then( m => m.ColaboradorModule) },
  { path: 'produtos', loadChildren: () => import('./produto/produto.module').then( m => m.ProdutoModule) },
  { path: 'pagamentos', loadChildren: () => import('./pagamento/pagamento.module').then( m => m.PagamentoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
