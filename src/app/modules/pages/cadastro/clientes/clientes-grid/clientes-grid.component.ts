import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { ClienteService } from "../../../../../core/services/cliente.service";
import { Cliente } from "../../../../../core/interfaces/cliente";
import { AlertService } from "../../../../../core/services/alert.service";
import { MatSort, Sort } from "@angular/material/sort";

@Component({
  selector: 'app-clientes-grid',
  templateUrl: './clientes-grid.component.html',
  styleUrls: ['./clientes-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientesGridComponent implements OnInit {

  displayedColumns = ['nome_razao_social', 'cpf', 'mail', 'telefone'];
  dataSource = new MatTableDataSource<Cliente>;

  pesquisaForm = this.fb.group({
    filtro: ['', Validators.required]
  })

  constructor(private router: Router,
              private fb: FormBuilder,
              private clienteService: ClienteService,
              public _MatPaginatorIntl: MatPaginatorIntl,
              private alertService: AlertService
  ) {
  }

  public paginator: any = MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.loadPage(1,10);

    //traduz label da barra de paginação da tabela
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Pagina'
  }

  public filtro() {
    console.log(typeof this.pesquisaForm.value.filtro)
    const filter = this.pesquisaForm.get('filtro')?.value
    this.loadPage(1, 10);
  }

  public limparFiltro() {
    this.pesquisaForm.reset();
    this.loadPage(1, 10);
  }

  loadPage(page: number, pageSize: number) {
    const label = this.sort?.active === undefined ? '' : this.sort?.active
    const dir = this.sort?.direction === undefined ? '' : this.sort?.direction
    const params = {
      per_page: pageSize,
      page: page,
      filtro: this.pesquisaForm.get('filtro')?.value,
      label:label,
      dir: dir
    }

    this.clienteService.listClientes(params).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data.data);
        this.paginator.length = res.data.total
      }, error: (err) => {
        this.alertService.errorMessage(err)
      }
    })
  }

  sortChange(sortState: Sort) {
    this.loadPage(this.paginator.pageIndex+1, this.paginator.pageSize)
  }
}
