import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { LoadingService } from "./core/services/loading.service";

@Component({
  selector: 'app-root',
  template: `
    <app-loading *ngIf="this.loadingService.loading$ |async"></app-loading>
    <app-header *ngIf="!(_router.url === '/login')" > </app-header>
    <app-login *ngIf="(_router.url === '/login')" ></app-login>
  `
})
export class AppComponent {

  constructor(public  _router: Router,
              public loadingService: LoadingService) {

  }
}
