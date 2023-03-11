import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DadosEmpresaRoutingModule } from './dados-empresa-routing.module';
import { DadosEmpresaComponent } from './dados-empresa/dados-empresa.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskDirective } from "ngx-mask";


@NgModule({
  declarations: [
    DadosEmpresaComponent
  ],
  imports: [
    CommonModule,
    DadosEmpresaRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ]
})
export class DadosEmpresaModule { }
