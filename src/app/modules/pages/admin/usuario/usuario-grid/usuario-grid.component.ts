import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Buffet } from "../../../../../core/interfaces/buffet";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "../../../../../core/services/usuario.service";
import { AlertService } from "../../../../../core/services/alert.service";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";

@Component({
  selector: 'app-usuario-grid',
  templateUrl: './usuario-grid.component.html',
  styleUrls: ['./usuario-grid.component.scss']
})
export class UsuarioGridComponent {

  public confirmDialog: boolean = false

  displayedColumns = ['id', 'nome', 'usuario', 'email', 'ativo', 'detalhes'];
  dataSource =  new MatTableDataSource<Buffet>;

  loading = true;

  pesquisaForm = this.fb.group({
    filtro: ['', Validators.required]
  })

  usuario = this.fb.group({
    id:[null],
    nome:[null],
    email:[null],
    usuario:[null],
    ativo:[null],
  })

  constructor(  private router: Router,
                private fb: FormBuilder,
                private usuarioService: UsuarioService,
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
    this.usuarioService.listUsers(filtro).subscribe({next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;

        setTimeout( () => {
          this.loading = false;
        }, 1500)

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

  public verDetalhes(id:number) {
    //this.router.navigate(['cadastros/buffet/consultar'])
  }

}
