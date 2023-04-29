import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { GridPagamentosComponent } from './grid-pagamentos/grid-pagamentos.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { NgxCurrencyModule } from "ngx-currency";
import { DetalhePagamentoModalComponent } from './detalhe-pagamento-modal/detalhe-pagamento-modal.component';
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
  declarations: [
    GridPagamentosComponent,
    DetalhePagamentoModalComponent
  ],
  imports: [
    CommonModule,
    FinanceiroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    ButtonModule,
    TableModule,
    MatPaginatorModule,
    MatTableModule,
    NgxCurrencyModule,
    MatDialogModule
  ]
})
export class FinanceiroModule { }
