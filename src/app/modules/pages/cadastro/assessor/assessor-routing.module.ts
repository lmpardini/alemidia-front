import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessorGridComponent } from "./assessor-grid/assessor-grid.component";
import { AssessorNewViewEditComponent } from "./assessor-new-view-edit/assessor-new-view-edit.component";

const routes: Routes = [
  { path: 'listar', component: AssessorGridComponent, data: {title: 'Listar'} },
  { path: 'novo', component:AssessorNewViewEditComponent, data: {title: 'Novo'} },
  { path: 'consultar/:id', component:AssessorNewViewEditComponent,  data: {title: 'Visualizar'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessorRoutingModule { }
