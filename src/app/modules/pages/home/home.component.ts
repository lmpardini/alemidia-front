import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit{

  public nome:any = localStorage.getItem('nome');

  public dataHoje:any;

  ngOnInit(): void {
    const data = new Date();

    this.dataHoje = this.formatarDataPorExtenso(data);

  }

  private formatarDataPorExtenso(data: Date): string {
    const diasDaSemana = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado'
    ];

    const mesesDoAno = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];

    const diaDaSemana = diasDaSemana[data.getDay()];
    const dia = data.getDate();
    const mes = mesesDoAno[data.getMonth()];
    const ano = data.getFullYear();

    return `${diaDaSemana}, ${dia} de ${mes} de ${ano}`;
  }

}
