import { Component, ViewChild } from '@angular/core';
import { Cliente } from "../../../../../core/interfaces/cliente";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClienteService } from "../../../../../core/services/cliente.service";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { Buffet } from "../../../../../core/interfaces/buffet";
import { BuffetService } from "../../../../../core/services/buffet.service";
import { AlertService } from "../../../../../core/services/alert.service";

@Component({
  selector: 'app-buffet-grid',
  templateUrl: './buffet-grid.component.html',
  styleUrls: ['./buffet-grid.component.scss']
})
export class BuffetGridComponent {

  public clientes:Cliente[] = [];

  displayedColumns = ['id', 'nome', 'mail', 'celular', 'cidade', 'detalhes'];
  dataSource =  new MatTableDataSource<Buffet>;

  pesquisaForm = this.fb.group({
    filtro: ['', Validators.required]
  })

  constructor(  private router: Router,
                private fb: FormBuilder,
                private buffetService: BuffetService,
                private alertService: AlertService,
                public _MatPaginatorIntl: MatPaginatorIntl,
  ) { }

  private paginator:any =  MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.listBuffet('');

    //traduz label da barra de paginação da tabela
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Pagina'
  }

  public listBuffet(filtro: string | null | undefined) {
    this.buffetService.listBuffet(filtro).subscribe({next: (res) => {
      this.clientes = res.data;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    }, error: (err) => {
      this.alertService.errorMessage(err);
    }})}

  public filtro() {
    console.log(typeof this.pesquisaForm.value.filtro)
    const filter = this.pesquisaForm.get('filtro')?.value
    this.listBuffet(filter)
  }

  public limparFiltro() {
    this.pesquisaForm.reset();
    this.listBuffet('');
  }
}
