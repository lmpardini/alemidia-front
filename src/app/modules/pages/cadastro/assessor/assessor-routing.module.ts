import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessorGridComponent } from "./assessor-grid/assessor-grid.component";
import { AssessorNewViewEditComponent } from "./assessor-new-view-edit/assessor-new-view-edit.component";

const routes: Routes = [
  { path: 'listar', component: AssessorGridComponent },
  { path: 'novo', component:AssessorNewViewEditComponent },
  { path: 'consultar/:id', component:AssessorNewViewEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessorRoutingModule { }
