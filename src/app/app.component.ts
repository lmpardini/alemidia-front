import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  template: `<app-header *ngIf="!(_router.url === '/login')" ></app-header>
             <app-login *ngIf="(_router.url === '/login')" ></app-login>
  `
})
export class AppComponent {

  constructor(public  _router: Router) {
  }
}
