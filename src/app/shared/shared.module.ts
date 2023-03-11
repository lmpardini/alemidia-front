import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DesejaCancelarComponent } from './dialogs/deseja-cancelar/deseja-cancelar.component';
import { MatDialogModule } from "@angular/material/dialog";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from "@ng-bootstrap/ng-bootstrap";
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    HeaderComponent,
    DesejaCancelarComponent,
    LoadingComponent,

  ],
  exports: [
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatSidenavModule,
    MatIconModule,
    RouterOutlet,
    MatToolbarModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    MatProgressSpinnerModule

  ],
  providers: [provideNgxMask()]
})
export class SharedModule { }
