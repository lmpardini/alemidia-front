import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaHomeComponent } from "./agenda-home/agenda-home.component";


const routes: Routes = [
  { path: '', component: AgendaHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
