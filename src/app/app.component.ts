import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: 'app-root',
  template: `
    <app-header *ngIf="!(_router.url === '/login')" >


  </app-header>
             <app-login *ngIf="(_router.url === '/login')" ></app-login>
  `
})
export class AppComponent {

  @BlockUI() blockUI: NgBlockUI | undefined;

  constructor(public  _router: Router) {


  }
}
