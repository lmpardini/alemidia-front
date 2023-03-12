import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioGridComponent } from './usuario-grid/usuario-grid.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { UsuarioViewNewEditComponent } from './usuario-view-new-edit/usuario-view-new-edit.component';
import { NgxMaskDirective } from "ngx-mask";
import { AppModule  } from "../../../../app.module";
import { AtivoPipe } from "../../../../core/pipes/ativo.pipe";
import { SharedModule } from "../../../../shared/shared.module";



@NgModule({
  declarations: [
    UsuarioGridComponent,
    UsuarioViewNewEditComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMaskDirective,
    SharedModule,
  ]
})
export class UsuarioModule { }
