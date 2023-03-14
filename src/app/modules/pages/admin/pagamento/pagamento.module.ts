import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentoRoutingModule } from './pagamento-routing.module';
import { CondicaoPagamentoGridComponent } from './condicao-pagamento/condicao-pagamento-grid/condicao-pagamento-grid.component';
import { FormaPagamentoGridComponent } from './forma-pagamento/forma-pagamento-grid/forma-pagamento-grid.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "../../../../shared/shared.module";
import { FormaPagamentoNewViewEditComponent } from './forma-pagamento/forma-pagamento-new-view-edit/forma-pagamento-new-view-edit.component';


@NgModule({
  declarations: [
    CondicaoPagamentoGridComponent,
    FormaPagamentoGridComponent,
    FormaPagamentoNewViewEditComponent
  ],
  imports: [
    CommonModule,
    PagamentoRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    SharedModule
  ]
})
export class PagamentoModule { }
