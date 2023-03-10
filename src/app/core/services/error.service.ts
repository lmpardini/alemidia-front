import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";
import { AlertService } from "./alert.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router,
              private loginService: LoginService,
              private alertService: AlertService,
              private location: Location) {
  }

  public naoAutenticado(err:any) {
    window.localStorage.clear();
    this.router.navigate(['/login']);

    if (!['/login'].includes(this.location.path())) {
      this.alertService.errorGenericMessage("Sessão expirada, por favor efetue login");
    }
    if (['/login'].includes(this.location.path())) {
      this.alertService.errorGenericMessage(err.error.message);
    }
  }

  public erroFormInvalid(err: any) {
      Object.entries(err.errors).forEach(res => {
        // @ts-ignore
        this.alertService.errorGenericMessage(res[1].toString());
      })

  }
}
