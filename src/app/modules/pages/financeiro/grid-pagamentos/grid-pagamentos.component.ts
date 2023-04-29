import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ContratoPagamentoService } from "../../../../core/services/contrato-pagamento.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { debounceTime } from "rxjs";
import { DesejaCancelarComponent } from "../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { MatDialog } from "@angular/material/dialog";
import { DetalhePagamentoModalComponent } from "../detalhe-pagamento-modal/detalhe-pagamento-modal.component";

@Component({
  selector: 'app-grid-pagamentos',
  templateUrl: './grid-pagamentos.component.html',
  styleUrls: ['./grid-pagamentos.component.scss']
})
export class GridPagamentosComponent implements OnInit {

  pesquisaForm!: UntypedFormGroup
  displayedColumns = ['contrato', 'contratante', 'data_pagamento', 'valor', 'situacao'];

  private paginator: any = MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  dataSource = new MatTableDataSource<any>;

  valores: any[] = []


  constructor(private fb: FormBuilder,
              private contratoPagamentoService: ContratoPagamentoService,
              public _MatPaginatorIntl: MatPaginatorIntl,
              private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.createForm();
    this.detectedChanges()

    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Pagina'
  }

  public createForm(): void {

    this.pesquisaForm = this.fb.group({
      tipo_pagamento: [null, Validators.required],
      tipo_busca: [null, Validators.required],
      filtro: [null, Validators.required],
      periodo: [null, Validators.required],
      data_inicio: [new Date().toISOString().substring(0, 10), Validators.required],
      data_fim: [new Date().toISOString().substring(0, 10), Validators.required],
    });
  }

  public detectedChanges() {
    this.pesquisaForm.valueChanges.pipe(
      debounceTime(500)).subscribe({
      next: (res) => {
        if ((this.pesquisaForm.get('tipo_pagamento')?.value && this.pesquisaForm.get('tipo_busca')?.value && this.pesquisaForm.get('periodo')?.value) ||
          (this.pesquisaForm.get('tipo_pagamento')?.value && this.pesquisaForm.get('tipo_busca')?.value && this.pesquisaForm.get('filtro')?.value)) {
          this.loadData();
        }
      }
    });
  }
  handleOption(event:string) {
    this.pesquisaForm.get('periodo')?.reset();
    this.pesquisaForm.get('filtro')?.reset();
  }

  public loadData() {
    this.contratoPagamentoService.list(this.pesquisaForm.value).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.dataSource.paginator = this.paginator;
        this.valores = res.data
      }
    });
  }

  public openDetalhesPagamentoModal(row:any) {
    const dialogRef = this.dialog.open(DetalhePagamentoModalComponent, {
      width: '600px',
      data: row
    });
    dialogRef.afterClosed().subscribe({next: (res) => {
      this.loadData();
      }})
  }
}
