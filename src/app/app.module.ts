import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { LoginModule } from "./modules/pages/login/login.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { BlockUI, BlockUIModule, NgBlockUI } from "ng-block-ui";
import { TokenInterceptor } from "./core/interceptor/token.interceptor";
import { LoadingInterceptor } from "./core/interceptor/loading.interceptor";
import { AtivoPipe } from './core/pipes/ativo.pipe';
import * as moment from 'moment-timezone';



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LoginModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'pt-BR', multi: true },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' , multi: true},
    { provide: 'moment', useFactory: () => moment().tz('America/Sao_Paulo'), multi: true },

  ],
  exports: [


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
