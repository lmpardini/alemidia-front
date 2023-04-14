import { Component, ViewChild } from '@angular/core';
import { Cliente } from "../../../../core/interfaces/cliente";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClienteService } from "../../../../core/services/cliente.service";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { AlertService } from "../../../../core/services/alert.service";
import { ContratoService } from "../../../../core/services/contrato.service";

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

  private paginator:any =  MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.createForm();
    this.listContratos('', '', '');


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


  public listContratos(filtro: any, data_inicio: any, data_fim: any) {
    this.contratoService.list({filtro: filtro, data_inicio: data_inicio, data_fim: data_fim} ).subscribe({next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
      }, error: (err) =>{
        this.alertService.errorMessage(err)
      }
    })
  }

  public filtro() {
    let filtro = this.pesquisaForm.get('filtro')?.value !== null ? this.pesquisaForm.get('filtro')?.value : '';
    let data_inicio = this.pesquisaForm.get('data_inicio')?.value !== null ? this.pesquisaForm.get('data_inicio')?.value : '';
    let data_fim = this.pesquisaForm.get('data_fim')?.value !== null ? this.pesquisaForm.get('data_fim')?.value : '';

    this.listContratos(filtro, data_inicio, data_fim)
  }

  public limparFiltro() {
    this.pesquisaForm.reset();
    this.listContratos('', '', '');
  }

  abreFiltro() {
    this.areaFiltro = !this.areaFiltro

  }
}
