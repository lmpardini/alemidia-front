import { Component, ViewChild } from '@angular/core';
import { Cliente } from "../../../../core/interfaces/cliente";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClienteService } from "../../../../core/services/cliente.service";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { AlertService } from "../../../../core/services/alert.service";
import { ContratoService } from "../../../../core/services/contrato.service";
import { MatSort, Sort } from "@angular/material/sort";

@Component({
  selector: 'app-contrato-grid',
  templateUrl: './contrato-grid.component.html',
  styleUrls: ['./contrato-grid.component.scss']
})
export class ContratoGridComponent {

  displayedColumns = ['id', 'data_evento', 'contratante', 'produtos','buffet'];
  dataSource =  new MatTableDataSource<any>;

  pesquisaForm!: UntypedFormGroup;

  areaFiltro:boolean = false;

  constructor(  private router: Router,
                private fb: FormBuilder,
                private contratoService: ContratoService,
                public _MatPaginatorIntl: MatPaginatorIntl,
                private alertService: AlertService

  ) { }

  public paginator:any =  MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.createForm();
    this.dataSource.sort = this.sort;
    this.loadPage(1,10);

    //traduz label da barra de paginação da tabela
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Pagina'
  }

  public createForm() {
    this.pesquisaForm = this.fb.group({
      filtro: ['', Validators.required],
      data_inicio: [''],
      data_fim: ['']
    })
  }

  loadPage(page: number, pageSize: number) {
    const label = this.sort?.active === undefined ? '' : this.sort?.active
    const dir = this.sort?.direction === undefined ? '' : this.sort?.direction
    const params = {
      per_page: pageSize,
      page: page,
      filtro: this.pesquisaForm.get('filtro')?.value === null ? '' : this.pesquisaForm.get('filtro')?.value,
      data_inicio: this.pesquisaForm.get('data_inicio')?.value === null ? '' : this.pesquisaForm.get('data_inicio')?.value,
      data_fim: this.pesquisaForm.get('data_fim')?.value === null ? '' : this.pesquisaForm.get('data_fim')?.value,
      label:label,
      dir: dir
    }

    this.contratoService.list(params).subscribe({
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


  public filtro() {
    this.loadPage(1,10);
  }

  public limparFiltro() {
    this.pesquisaForm.reset();
    this.loadPage(1,10);
  }

  abreFiltro() {
    this.areaFiltro = !this.areaFiltro
  }
}
