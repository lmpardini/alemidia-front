import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cadastro: boolean = false
  public vendas: boolean = false
  public financeiro: boolean = false
  public admin: boolean = true

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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
