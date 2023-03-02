import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-deseja-cancelar',
  templateUrl: './deseja-cancelar.component.html',
  styleUrls: ['./deseja-cancelar.component.scss']
})
export class DesejaCancelarComponent implements OnInit {

  public titulo:string ='';
  public descricao:string ='';
  public tipo :string ='';

  public confirm: boolean = false;

  constructor(public dialogRef: MatDialogRef<DesejaCancelarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit(): void {
    this.titulo = this.data.titulo
    this.descricao = this.data.descricao
    this.tipo = this.data.tipo
  }

  public cancelar() {
    this.dialogRef.close(this.confirm)
  }

  public confirmar() {
    this.confirm = true;
    this.dialogRef.close(this.confirm);
  }

}
