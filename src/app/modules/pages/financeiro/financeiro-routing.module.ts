import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridPagamentosComponent } from "./grid-pagamentos/grid-pagamentos.component";

const routes: Routes = [
  { path: 'listar', component: GridPagamentosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
