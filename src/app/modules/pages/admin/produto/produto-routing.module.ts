import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoGridComponent } from "./produto-grid/produto-grid.component";
import { ProdutoNewViewEditComponent } from "./produto-new-view-edit/produto-new-view-edit.component";

const routes: Routes = [
  { path: 'listar', component: ProdutoGridComponent },
  { path: 'novo', component: ProdutoNewViewEditComponent },
  { path: 'consultar/:id', component: ProdutoNewViewEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
