import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from "../../../../../core/interfaces/cliente";
import { MatTableDataSource } from "@angular/material/table";
import { Buffet } from "../../../../../core/interfaces/buffet";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BuffetService } from "../../../../../core/services/buffet.service";
import { AlertService } from "../../../../../core/services/alert.service";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { AssessoriaService } from "../../../../../core/services/assessoria.service";

@Component({
  selector: 'app-assessor-grid',
  templateUrl: './assessor-grid.component.html',
  styleUrls: ['./assessor-grid.component.scss']
})
export class AssessorGridComponent implements OnInit {

  public clientes:Cliente[] = [];

  displayedColumns = ['id', 'nome', 'mail', 'celular', 'cidade', 'detalhes'];
  dataSource =  new MatTableDataSource<Buffet>;

  pesquisaForm = this.fb.group({
    filtro: ['', Validators.required]
  })

  constructor(  private router: Router,
                private fb: FormBuilder,
                private assessoriaService: AssessoriaService,
                private alertService: AlertService,
                public _MatPaginatorIntl: MatPaginatorIntl,
  ) { }

  private paginator:any =  MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.listAssessoria('');

    //traduz label da barra de paginação da tabela
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Pagina'
  }

  public listAssessoria(filtro: string | null | undefined) {
    this.assessoriaService.listAssessoria(filtro).subscribe({next: (res) => {
        this.clientes = res.data;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }})}

  public filtro() {
    const filter = this.pesquisaForm.get('filtro')?.value
    this.listAssessoria(filter)
  }

  public limparFiltro() {
    this.pesquisaForm.reset();
    this.listAssessoria('');
  }
}
