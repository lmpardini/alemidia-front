import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ColaboradorGridComponent } from './colaborador-grid/colaborador-grid.component';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";
import { MatCardModule } from "@angular/material/card";
import { ColaboradorNewViewEditComponent } from './colaborador-new-view-edit/colaborador-new-view-edit.component';
import { MatSelectModule } from "@angular/material/select";


@NgModule({
  declarations: [
    ColaboradorGridComponent,
    ColaboradorNewViewEditComponent
  ],
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxMaskPipe,
    MatCardModule,
    NgxMaskDirective,
    MatSelectModule
  ]
})
export class ColaboradorModule { }
