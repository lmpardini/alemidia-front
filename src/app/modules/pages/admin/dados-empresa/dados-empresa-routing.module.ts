import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadosEmpresaComponent } from "./dados-empresa/dados-empresa.component";

const routes: Routes = [
  { path: '', component:DadosEmpresaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DadosEmpresaRoutingModule { }
