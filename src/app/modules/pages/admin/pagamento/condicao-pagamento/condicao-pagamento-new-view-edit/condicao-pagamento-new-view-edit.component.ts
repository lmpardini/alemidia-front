import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormaPagamentoService } from "../../../../../../core/services/admin/pagamento/forma-pagamento.service";
import { AlertService } from "../../../../../../core/services/alert.service";
import { MatDialog } from "@angular/material/dialog";
import { DesejaCancelarComponent } from "../../../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { CondicaoPagamentoService } from "../../../../../../core/services/admin/pagamento/condicao-pagamento.service";

@Component({
  selector: 'app-condicao-pagamento-new-view-edit',
  templateUrl: './condicao-pagamento-new-view-edit.component.html',
  styleUrls: ['./condicao-pagamento-new-view-edit.component.scss']
})
export class CondicaoPagamentoNewViewEditComponent {

  public edit: boolean = true
  public view: boolean = false
  public new: boolean = false
  public id: number = 0;

  public confirmDialog: boolean = false

  public formasPagamento:any = [];

  novaCondicaoPagamento = this.fb.group({
    ativo: [true],
    nome: [null, Validators.required],
    aceita_parcelamento: [null, Validators.required],
    forma_pagamento: [null, Validators.required],
    descricao: [null, Validators.required],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private condicaoPagamentoService: CondicaoPagamentoService,
               private formaPagamentoService: FormaPagamentoService,
               private alert: AlertService,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formaPagamentoService.listFormaPagamento().subscribe({next: (res) => {
      this.formasPagamento = res.data
      }})
    this.activatedRoute.params.subscribe({next: (res) => {
        //se vier parametro de id, significa que é visualização. Então seta as variaveis de ocultar botões e busca por id no banco
        if (res['id']) {
          this.view = true;
          this.edit = false;
          this.getCondicaoPagamento(res['id']);
          this.novaCondicaoPagamento.disable();
          this.id = res['id'];
        } else {
          this.new = true;
        }
      }});
  }

  public getCondicaoPagamento(id:number) {
    this.condicaoPagamentoService.listById(id).subscribe({next: (res) => {
        let dados = JSON.parse(JSON.stringify(res.data));
        this.novaCondicaoPagamento.patchValue(dados)
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }});
  }

  public add(): void {
    if (this.new) {
      this.condicaoPagamentoService.store(this.novaCondicaoPagamento.value).subscribe( {next: (res) => {
          this.alert.successMessage(res.message);
          this.router.navigate(['admin/pagamentos/condicoes/listar']);
        }, error: (err) => {
          this.alert.errorMessage(err);
        }});
    } else {
      this.openDialogEdit();
    }
  }

  public cancelAdd() {
    // verifica se é edição ou cadastro novo
    if (!this.view && this.edit && !this.new){
      if (this.novaCondicaoPagamento.dirty){
        this.openDialogCancel()
      } else {
        this.view = true
        this.edit = false
        this.novaCondicaoPagamento.disable();
        return;
      }
    } else {
      if (this.novaCondicaoPagamento.dirty) {
        this.openDialogCancel()
      } else {
        this.router.navigate(['admin/pagamentos/condicoes/listar'])
      }
    }
  }

  public cancelarEdicao() {
    this.edit = !this.edit;
    this.novaCondicaoPagamento.disable()
  }

  public editar(): void {
    this.edit = !this.edit;
    this.view = !this.view;
    this.novaCondicaoPagamento.enable();
  }

  public openDialogCancel(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Cancelar Alterações", descricao: "Deseja realmante cancelar as alterações? Os dados modificados serão perdidos", tipo: 'advertencia' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        if (!this.view && this.edit && !this.new) {
          this.view = true
          this.edit = false
          this.novaCondicaoPagamento.disable();
          return;
        }
        this.router.navigate(['admin/pagamentos/condicoes/listar'])
      }
    })
  }

  public openDialogEdit(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Editar Cadastro", descricao: "Deseja realmante editar as informações deste cadastro?", tipo: 'confirmacao' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.condicaoPagamentoService.update(this.id, this.novaCondicaoPagamento.value).subscribe({next: (res) => {
            this.alertService.successMessage(res.message);
            this.router.navigate(['admin/pagamentos/condicoes/listar']);
          }, error: (err) => {
            this.alert.errorMessage(err);
          }});
      }
      return;
    })
  }

}
