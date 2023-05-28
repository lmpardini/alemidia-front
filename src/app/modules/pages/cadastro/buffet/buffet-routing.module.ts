import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuffetGridComponent } from "./buffet-grid/buffet-grid.component";
import { BuffetNewViewEditComponent } from "./buffet-new-view-edit/buffet-new-view-edit.component";

const routes: Routes = [
  { path: 'listar', component:BuffetGridComponent, data: {title: 'Listar'} },
  { path: 'novo', component:BuffetNewViewEditComponent, data: {title: 'Novo'} },
  { path: 'consultar/:id', component:BuffetNewViewEditComponent,  data: {title: 'Visualizar'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuffetRoutingModule { }
