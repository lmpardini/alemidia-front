import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertService } from "../../../../core/services/alert.service";
import { LoginService } from "../../../../core/services/login.service";

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.scss']
})
export class PrimeiroAcessoComponent {

  loginForm = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(8)]],
    password_confirmation: [null, [Validators.required, Validators.minLength(8)]],
  })

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService: AlertService,
              private loginService:LoginService) {}

  public trocaSenha() {
    this.loginService.trocarSenha(this.loginForm.value).subscribe({next: (res) => {
      this.router.navigate(['/home']);
      this.alertService.successMessage(res.message);
      }, error: (err) => {
      }})
  }
}
