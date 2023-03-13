import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoGridComponent } from './produto-grid/produto-grid.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ProdutoNewViewEditComponent } from './produto-new-view-edit/produto-new-view-edit.component';


@NgModule({
  declarations: [
    ProdutoGridComponent,
    ProdutoNewViewEditComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProdutoModule { }
