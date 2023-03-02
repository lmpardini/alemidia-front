import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesGridComponent } from "./components/clientes-grid/clientes-grid.component";
import { ClientesCriarComponent } from "./components/clientes-criar/clientes-criar.component";
import { ClientesEditarComponent } from "./components/clientes-editar/clientes-editar.component";

const routes: Routes = [
  { path: '', component: ClientesGridComponent },
  { path: 'novo', component: ClientesCriarComponent},
  { path: 'consultar/:id', component: ClientesEditarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
