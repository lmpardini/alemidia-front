import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { AlertService } from "../../../core/services/alert.service";
import { LoginService } from "../../../core/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = this.fb.group({
    usuario: [null, Validators.required],
    password: [null, Validators.required]
  })

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService: AlertService,
              private loginService:LoginService) {
  }

  ngOnInit(): void {
    /**
     * Transforma as letras do input de login em minusculas
     */
    this.loginForm.get('login')?.valueChanges.subscribe(event => {
      // @ts-ignore
      this.loginForm.get('login')?.setValue(event.toLowerCase(), {emitEvent: false});
    });
  }

  public login() {
    this.loginService.login(this.loginForm.value).subscribe({next: (res) => {

      if (res.data.user.primeiro_acesso){
        this.router.navigate(['/login/primeiro-acesso'])
      } else {
        this.router.navigate(['/home'])
      }
    }, error: (err) => {
      this.alertService.errorMessage(err);
      }})

  }

}
