import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DesejaCancelarComponent } from "../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { an } from "@fullcalendar/core/internal-common";
import { ContratoPagamentoService } from "../../../../core/services/contrato-pagamento.service";
import { AlertService } from "../../../../core/services/alert.service";

@Component({
  selector: 'app-detalhe-pagamento-modal',
  templateUrl: './detalhe-pagamento-modal.component.html',
  styleUrls: ['./detalhe-pagamento-modal.component.scss']
})
export class DetalhePagamentoModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DetalhePagamentoModalComponent>,
              private dialog: MatDialog,
              private router: Router,
              private contratoPagamentoService: ContratoPagamentoService,
              private alertService: AlertService) {
  }

  verContrato(): void {
    this.router.navigate([`/contratos/consultar/${this.data.contrato}`])
    this.dialogRef.close()
  }

  public quitarPagamento(quitado: boolean) {
    const mensagemReabrir = {
      titulo: "Reabrir Parcela",
      descricao: "Deseja realmente reabrir a parcela para o contrato selecionado?",
      tipo: "advertencia"
    }

    const mensagemQuitar = {
      titulo: "Quitar Parcela",
      descricao: "Deseja realmente quitar a parcela para o contrato selecionado?",
      tipo: "confirmacao"
    }

    if (quitado) {
      this.openConfirmaAlteracaoPgtoModal(mensagemQuitar, quitado);
    } else {
      this.openConfirmaAlteracaoPgtoModal(mensagemReabrir, quitado);
    }

  }

  public openConfirmaAlteracaoPgtoModal(mensagem: any, quitado: boolean): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: {
        titulo: mensagem.titulo,
        descricao: mensagem.descricao,
        tipo: mensagem.tipo
      }
    });
    dialogRef.afterClosed().subscribe(res => {
        if (res) {
          const paramns = {
            contrato_pagamento_id: this.data.id,
            quitado: quitado,
          }
          this.contratoPagamentoService.update(paramns).subscribe({
            next: (res) => {
              this.alertService.successMessage(res.message);
            }
          })
          this.dialogRef.close();
        }
      }
    )
  }


}
