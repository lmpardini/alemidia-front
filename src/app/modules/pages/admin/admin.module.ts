import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminGridComponent } from './admin-grid/admin-grid.component';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    AdminGridComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class AdminModule { }
