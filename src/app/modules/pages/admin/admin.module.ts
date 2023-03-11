import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxMaskPipe } from "ngx-mask";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    NgxMaskPipe,
    MatTableModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class AdminModule { }
