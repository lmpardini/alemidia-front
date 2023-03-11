import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "../../../../../core/services/usuario.service";
import { AlertService } from "../../../../../core/services/alert.service";
import { BuscaCepService } from "../../../../../core/services/busca-cep.service";
import { MatDialog } from "@angular/material/dialog";
import { DesejaCancelarComponent } from "../../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { GenericValidator } from "../../../../../core/validators";
import { DadosEmpresaService } from "../../../../../core/services/dados-empresa.service";

@Component({
  selector: 'app-dados-empresa',
  templateUrl: './dados-empresa.component.html',
  styleUrls: ['./dados-empresa.component.scss']
})
export class DadosEmpresaComponent implements OnInit {

  public edit: boolean = false
  public view: boolean = true

  public confirmDialog: boolean = false

  dadosEmpresa = this.fb.group({
    id: [null],
    nome_fantasia: [null, Validators.required],
    razao_social: [null, Validators.required],
    site: [null, Validators.required],
    cnpj: [null, Validators.compose([Validators.required, GenericValidator.ValidaCpf])],
    inscricao_estadual: [null, Validators.required],
    tel_comercial: [null, Validators.compose([GenericValidator.ValidaTelefone])],
    cel_comercial: [null, Validators.compose([Validators.required, GenericValidator.ValidaTelefone])],
    cel_comercial2: [null, Validators.compose([GenericValidator.ValidaTelefone])],
    representante_legal: [null, Validators.required],
    rg_representante: [null, Validators.required],
    cpf_representante: [null, Validators.compose([Validators.required, GenericValidator.ValidaCpf])],
    logradouro: [null, Validators.required],
    numero: [null, Validators.required],
    complemento: [null],
    bairro: [null, Validators.required],
    cidade: [null, Validators.required],
    estado: [null, Validators.required],
    cep: [null, Validators.required],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private dadosEmpresaService: DadosEmpresaService,
               private alert: AlertService,
               private buscaCepService: BuscaCepService,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private dialog: MatDialog
  ) {  }

  ngOnInit(): void {
    this.dadosEmpresa.disable();
    this.getDados()}

  public getDados(){
    this.dadosEmpresaService.show().subscribe({next: (res) => {
        let dadosEmpresa = JSON.parse(JSON.stringify(res.data));
        this.dadosEmpresa.patchValue(dadosEmpresa[0]);
      }})
  }


  public cancelAdd() {
    if (this.dadosEmpresa.dirty){
      this.openDialogCancel()
    } else {
      this.view = true
      this.edit = false
      this.dadosEmpresa.disable();
      return;
    }
  }

  public editar(): void {
    this.edit = !this.edit;
    this.view = !this.view;
    this.dadosEmpresa.enable();
  }

  public add(): void {
    this.openDialogEdit()
  }

  public cancelAddCliente() {
    // verifica se é edição ou cadastro novo
    if (!this.view && this.edit) {
      if (this.dadosEmpresa.dirty) {
        this.openDialogCancel()
      } else {
        this.view = true
        this.edit = false
        this.dadosEmpresa.disable();
        return;
      }
    } else {
      if (this.dadosEmpresa.dirty) {
        this.openDialogCancel()
      } else {
        this.router.navigate(['cadastros/clientes/listar'])
      }
    }
  }

  public openDialogCancel(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Cancelar Alterações", descricao: "Deseja realmante cancelar as alterações? Os dados modificados serão perdidos", tipo: 'advertencia' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.view = true
        this.edit = false
        this.dadosEmpresa.disable();
        return;
      }
    })
  }

  public openDialogEdit(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Editar Cadastro", descricao: "Deseja realmante editar as informações deste cadastro?", tipo: 'confirmacao' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.dadosEmpresaService.edit(this.dadosEmpresa.value).subscribe({next: (res) => {
            this.alertService.successMessage(res.message);
            console.log('aqui')
            this.dadosEmpresa.disable();
            this.view = true;
            this.edit  = false;
          }, error: (err) => {
            this.alert.errorMessage(err);
            this.router.navigate(['admin/dados-empresa']);
          }});
      }
      return;
    })
  }

  public buscaCep() {
    this.buscaCepService.buscaCep(this.dadosEmpresa.value.cep).subscribe({next: (res) => {
        this.alert.successMessage(res.message);
        let dadosCep = JSON.parse(JSON.stringify(res.data));
        this.dadosEmpresa.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.dadosEmpresa.get('bairro')?.patchValue(dadosCep.bairro);
        this.dadosEmpresa.get('cidade')?.patchValue(dadosCep.localidade);
        this.dadosEmpresa.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.dadosEmpresa.get('estado')?.patchValue(dadosCep.uf);

      }, error: (err) => {
        this.alert.errorMessage(err);
      }})
  }
}
