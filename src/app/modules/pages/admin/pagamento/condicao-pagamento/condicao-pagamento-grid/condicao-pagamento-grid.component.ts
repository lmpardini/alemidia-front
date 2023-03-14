import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Buffet } from "../../../../../../core/interfaces/buffet";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FormaPagamentoService } from "../../../../../../core/services/admin/pagamento/forma-pagamento.service";
import { AlertService } from "../../../../../../core/services/alert.service";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { CondicaoPagamentoService } from "../../../../../../core/services/admin/pagamento/condicao-pagamento.service";

@Component({
  selector: 'app-condicao-pagamento-grid',
  templateUrl: './condicao-pagamento-grid.component.html',
  styleUrls: ['./condicao-pagamento-grid.component.scss']
})
export class CondicaoPagamentoGridComponent {

  public confirmDialog: boolean = false

  displayedColumns = ['id', 'nome','ativo', 'detalhes'];
  dataSource =  new MatTableDataSource<Buffet>;

  pesquisaForm = this.fb.group({
    filtro: ['', Validators.required]
  })

  constructor(  private router: Router,
                private fb: FormBuilder,
                private condicaoPagamentoService: CondicaoPagamentoService,
                private alertService: AlertService,
                public _MatPaginatorIntl: MatPaginatorIntl,

  ) { }

  private paginator:any =  MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.list('');

    //traduz label da barra de paginação da tabela
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Pagina'
  }

  public list(filtro: string | null | undefined) {
    this.condicaoPagamentoService.list(filtro).subscribe({next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }})}

  public filtro() {
    console.log(typeof this.pesquisaForm.value.filtro)
    const filter = this.pesquisaForm.get('filtro')?.value
    this.list(filter)
  }

  public limparFiltro() {
    this.pesquisaForm.reset();
    this.list('');
  }

}
