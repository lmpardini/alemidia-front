import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoGridComponent } from './contrato-grid/contrato-grid.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { ContratoNewViewEditComponent } from './contrato-new-view-edit/contrato-new-view-edit.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCardModule } from "@angular/material/card";
import { NgxCurrencyModule } from "ngx-currency";


@NgModule({
  declarations: [
    ContratoGridComponent,
    ContratoNewViewEditComponent
  ],
  imports: [
    CommonModule,
    ContratoRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    NgxMaskPipe,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    NgbTypeahead,
    MatAutocompleteModule,
    MatCardModule,
    NgxMaskDirective,
    NgxCurrencyModule,
    FormsModule
  ]
})
export class ContratoModule { }
