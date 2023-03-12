import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradorGridComponent } from "./colaborador-grid/colaborador-grid.component";
import { ColaboradorNewViewEditComponent } from "./colaborador-new-view-edit/colaborador-new-view-edit.component";

const routes: Routes = [
  { path: 'listar', component: ColaboradorGridComponent },
  { path: 'novo', component: ColaboradorNewViewEditComponent },
  { path: 'consultar/:id', component: ColaboradorNewViewEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule { }
