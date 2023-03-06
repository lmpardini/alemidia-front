import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { AlertService } from "../../../core/services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = this.fb.group({
    login: [null, Validators.required],
    password: [null, Validators.required]
  })

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  public irParaLogin():void {
    this.router.navigate(['home']);

  }

  public login() {
    // @ts-ignore
    if (this.loginForm.value.login === 'admin' && this.loginForm.value.password === 'admin'){
      this.router.navigate(['/home'])
    } else {


      this.alertService.errorGenericMessage("Usuário/Senha invalidos")
      this.loginForm.reset()
    }
  }

}
