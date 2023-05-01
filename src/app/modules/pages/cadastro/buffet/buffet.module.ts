import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuffetRoutingModule } from './buffet-routing.module';
import { BuffetGridComponent } from './buffet-grid/buffet-grid.component';
import { SharedModule } from "../../../../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { BuffetNewViewEditComponent } from './buffet-new-view-edit/buffet-new-view-edit.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";


@NgModule({
  declarations: [
    BuffetGridComponent,
    BuffetNewViewEditComponent
  ],
  imports: [
    CommonModule,
    BuffetRoutingModule,
    SharedModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    NgxMaskPipe,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    NgxMaskDirective,
    MatProgressSpinnerModule,
    MatSortModule,


  ]
})
export class BuffetModule { }
