import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGridComponent } from "./usuario-grid/usuario-grid.component";
import { UsuarioViewNewEditComponent } from "./usuario-view-new-edit/usuario-view-new-edit.component";

const routes: Routes = [
  { path: 'listar', component:UsuarioGridComponent},
  { path: 'novo', component:UsuarioViewNewEditComponent},
  { path: 'consultar/:id', component:UsuarioViewNewEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
