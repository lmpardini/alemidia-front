import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessorRoutingModule } from './assessor-routing.module';
import { AssessorGridComponent } from './assessor-grid/assessor-grid.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AssessorNewViewEditComponent } from './assessor-new-view-edit/assessor-new-view-edit.component';
import { MatSortModule } from "@angular/material/sort";


@NgModule({
  declarations: [
    AssessorGridComponent,
    AssessorNewViewEditComponent
  ],
  imports: [
    CommonModule,
    AssessorRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    NgxMaskPipe,
    MatProgressSpinnerModule,
    NgxMaskDirective,
    MatSortModule
  ]
})
export class AssessorModule { }
