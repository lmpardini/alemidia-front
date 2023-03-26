import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratoGridComponent } from "./contrato-grid/contrato-grid.component";
import { ContratoNewViewEditComponent } from "./contrato-new-view-edit/contrato-new-view-edit.component";

const routes: Routes = [
  { path: 'listar', component: ContratoGridComponent },
  { path: 'novo', component: ContratoNewViewEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoRoutingModule { }
