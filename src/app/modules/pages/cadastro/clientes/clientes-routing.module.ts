import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesGridComponent } from "./clientes-grid/clientes-grid.component";
import { ClientesCriarComponent } from "./clientes-criar/clientes-criar.component";

const routes: Routes = [
  { path: 'listar', component: ClientesGridComponent,  data: {title: 'Listar'}},
  { path: 'novo', component: ClientesCriarComponent,  data: {title: 'Novo'}},
  { path: 'consultar/:id', component: ClientesCriarComponent,  data: {title: 'Visualizar'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
