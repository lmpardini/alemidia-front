import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { ClienteService } from "../../../../../../core/services/cliente.service";
import { Cliente } from "../../../../../../core/interfaces/cliente";
import { AlertService } from "../../../../../../core/services/alert.service";

@Component({
  selector: 'app-clientes-grid',
  templateUrl: './clientes-grid.component.html',
  styleUrls: ['./clientes-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientesGridComponent implements OnInit {

  public clientes:Cliente[] = [];

  displayedColumns = ['id', 'nome', 'cpf', 'mail', 'telefone', 'detalhes'];
  dataSource =  new MatTableDataSource<Cliente>;

  pesquisaForm = this.fb.group({
    filtro: ['', Validators.required]
  })

  constructor(  private router: Router,
                private fb: FormBuilder,
                private clienteService: ClienteService,
                public _MatPaginatorIntl: MatPaginatorIntl,
                private alertService: AlertService

  ) { }

  private paginator:any =  MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.listCliente('')

    //traduz label da barra de paginação da tabela
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Pagina'
  }


  public listCliente(filtro: string | null | undefined) {
    this.clienteService.listClientes(filtro).subscribe({next: (res) => {
        this.clientes = res.data;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;

      }, error: (err) =>{
      this.alertService.errorMessage(err)
      }
    })
  }

  public filtro() {
    console.log(typeof this.pesquisaForm.value.filtro)
    const filter = this.pesquisaForm.get('filtro')?.value
    this.listCliente(filter)
  }

  public limparFiltro() {
    this.pesquisaForm.reset();
    this.listCliente('');
  }
}
