import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesGridComponent } from "./components/clientes-grid/clientes-grid.component";
import { ClientesCriarComponent } from "./components/clientes-criar/clientes-criar.component";

const routes: Routes = [
  { path: 'listar', component: ClientesGridComponent },
  { path: 'novo', component: ClientesCriarComponent},
  { path: 'consultar/:id', component: ClientesCriarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
