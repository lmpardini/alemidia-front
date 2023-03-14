import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaPagamentoGridComponent } from "./forma-pagamento/forma-pagamento-grid/forma-pagamento-grid.component";
import { CondicaoPagamentoGridComponent } from "./condicao-pagamento/condicao-pagamento-grid/condicao-pagamento-grid.component";
import { FormaPagamentoNewViewEditComponent } from "./forma-pagamento/forma-pagamento-new-view-edit/forma-pagamento-new-view-edit.component";
import {
  CondicaoPagamentoNewViewEditComponent
} from "./condicao-pagamento/condicao-pagamento-new-view-edit/condicao-pagamento-new-view-edit.component";

const routes: Routes = [
  { path: 'formas/listar', component: FormaPagamentoGridComponent },
  { path: 'formas/novo', component: FormaPagamentoNewViewEditComponent },
  { path: 'formas/consultar/:id', component: FormaPagamentoNewViewEditComponent },
  { path: 'condicoes/listar', component: CondicaoPagamentoGridComponent },
  { path: 'condicoes/novo', component: CondicaoPagamentoNewViewEditComponent },
  { path: 'condicoes/consultar/:id', component: CondicaoPagamentoNewViewEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
