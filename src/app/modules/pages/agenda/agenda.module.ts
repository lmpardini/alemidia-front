import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaHomeComponent } from './agenda-home/agenda-home.component';
import { FullCalendarModule } from "@fullcalendar/angular";
import { MatTabsModule } from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";


@NgModule({
  declarations: [
    AgendaHomeComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    FullCalendarModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatCardModule,

  ],

})
export class AgendaModule { }
