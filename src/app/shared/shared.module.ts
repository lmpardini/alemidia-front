import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatSidenavModule,
    MatIconModule,
    RouterOutlet,
    MatToolbarModule,
    NgxMaskDirective, NgxMaskPipe

  ],
  providers: [provideNgxMask()]
})
export class SharedModule { }
