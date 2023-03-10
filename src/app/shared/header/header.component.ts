import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../../core/services/login.service";
import { AlertService } from "../../core/services/alert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cadastro: boolean = false
  public vendas: boolean = false
  public financeiro: boolean = false
  public painelControle: boolean = false
  public admin: boolean = false

  public nome:string|null = ''

  constructor(
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('regra_acesso') === 'admin') {
      this.admin = true;
    }

    if (localStorage.getItem('nome')) {
      // @ts-ignore
      let nome = localStorage.getItem('nome').split(" ")
      this.nome = nome[0];
    }
  }

  public logout(){
    this.loginService.logout().subscribe({next: (res) =>{
      this.alertService.successMessage(res.message);
      this.router.navigate(['/login'])
      }})
  }

  public exibirCadastro(): void {
    this.cadastro = !this.cadastro;
  }
  public exibirVendas(): void {
    this.vendas = !this.vendas;
  }
  public exibirFinanceiro(): void {
    this.financeiro = !this.financeiro;
  }

  public exibirPainelcontrole(): void {
    this.painelControle = !this.painelControle;
  }

  public goToHome(): void {
    this.router.navigate(['home'])
  }

  public goToClientes(): void {
    this.router.navigate(['cadastros/clientes'])
  }

  public goToAssessoria(): void {
    this.router.navigate(['cadastros/assessoria'])
  }

  public goToBuffet(): void {
    this.router.navigate(['cadastros/buffet'])
  }
}
