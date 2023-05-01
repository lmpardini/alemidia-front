import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesGridComponent } from './clientes-grid/clientes-grid.component';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { ClientesCriarComponent } from './clientes-criar/clientes-criar.component';
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  declarations: [
    ClientesGridComponent,
    ClientesCriarComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatProgressSpinnerModule,
    MatSortModule,
  ]
})
export class ClientesModule { }
