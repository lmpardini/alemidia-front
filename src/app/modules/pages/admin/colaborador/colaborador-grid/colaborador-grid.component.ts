import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Buffet } from "../../../../../core/interfaces/buffet";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "../../../../../core/services/usuario.service";
import { AlertService } from "../../../../../core/services/alert.service";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { Cliente } from "../../../../../core/interfaces/cliente";
import { AssessoriaService } from "../../../../../core/services/assessoria.service";
import { ColaboradorService } from "../../../../../core/services/colaborador.service";

@Component({
  selector: 'app-colaborador-grid',
  templateUrl: './colaborador-grid.component.html',
  styleUrls: ['./colaborador-grid.component.scss']
})
export class ColaboradorGridComponent implements OnInit {

  public clientes:Cliente[] = [];

  displayedColumns = ['id', 'nome', 'celular', 'cidade', 'funcao', 'detalhes'];
  dataSource =  new MatTableDataSource<Buffet>;

  pesquisaForm = this.fb.group({
    filtro: ['', Validators.required]
  })

  constructor(  private router: Router,
                private fb: FormBuilder,
                private colaboradorService: ColaboradorService,
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
    this.colaboradorService.list(filtro).subscribe({next: (res) => {
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
