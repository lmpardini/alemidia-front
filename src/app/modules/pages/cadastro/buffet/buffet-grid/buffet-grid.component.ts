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
import { MatSort, Sort } from "@angular/material/sort";

@Component({
  selector: 'app-buffet-grid',
  templateUrl: './buffet-grid.component.html',
  styleUrls: ['./buffet-grid.component.scss']
})
export class BuffetGridComponent {

  displayedColumns = ['nome_razao_social', 'mail', 'celular', 'cidade'];
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

  public paginator:any =  MatPaginator;

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
    const filter = this.pesquisaForm.get('filtro')?.value
    this.loadPage(1,10);
  }

  public limparFiltro() {
    this.pesquisaForm.reset();
    this.loadPage(1,10);
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

    this.buffetService.list(params).subscribe({
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
