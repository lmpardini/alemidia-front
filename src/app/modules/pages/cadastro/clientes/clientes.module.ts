import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesGridComponent } from './components/clientes-grid/clientes-grid.component';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { ClientesCriarComponent } from './components/clientes-criar/clientes-criar.component';
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";

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
  ]
})
export class ClientesModule { }
