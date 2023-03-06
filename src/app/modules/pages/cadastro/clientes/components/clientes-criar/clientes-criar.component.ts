import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClienteService } from "../../../../../../core/services/cliente.service";
import { AlertService } from "../../../../../../core/services/alert.service";
import { BuscaCepService } from "../../../../../../core/services/busca-cep.service";
import { MatDialog } from "@angular/material/dialog";
import { DesejaCancelarComponent } from "../../../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { GenericValidator } from "../../../../../../core/validators";

@Component({
  selector: 'app-clientes-criar',
  templateUrl: './clientes-criar.component.html',
  styleUrls: ['./clientes-criar.component.scss'],


})
export class ClientesCriarComponent implements OnInit{

  cliente:any;

  public edit: boolean = true
  public view: boolean = false
  public new: boolean = false
  public clienteId: number = 0;

  public loading = false;

  public confirmDialog: boolean = false

  novoCliente = this.fb.group({
    tipo_cadastro: ['pf'],
    ativo: [true],
    nome_razao_social: [null, Validators.required],
    mail: [null, [Validators.required, Validators.email]],
    //cpf_cnpj: [null, Validators.required],
    cpf_cnpj: [null, Validators.compose([Validators.required, GenericValidator.ValidaCpf])],
    rg_ie: [null],
    telefone: [null, Validators.compose([GenericValidator.ValidaTelefone])],
    celular: [null, Validators.compose([Validators.required, GenericValidator.ValidaTelefone])],
    celular2: [null, Validators.compose([GenericValidator.ValidaTelefone])],
    logradouro: [null, Validators.required],
    numero: [null, Validators.required],
    complemento: [null],
    bairro: [null, Validators.required],
    cidade: [null, Validators.required],
    estado: [null, Validators.required],
    cep: [null, Validators.required],
  });

  public  tipoCadastro = this.novoCliente.value.tipo_cadastro;

  constructor( private fb: FormBuilder,
               private router: Router,
               private clienteService: ClienteService,
               private alert: AlertService,
               private buscaCepService: BuscaCepService,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({next: (res) => {
      //se vier parametro de id, significa que é visualização. Então seta as variaveis de ocultar botões e busca por id no banco
      if (res['id']) {
        this.view = true;
        this.edit = false;
        this.getCliente(res['id']);
        this.novoCliente.disable();
        this.clienteId = res['id'];
      } else {
        this.new = true;
      }
      }});
  }

  public getCliente(id:number) {
    this.clienteService.listClientesbyId(id).subscribe({next: (res) => {
        let dadosCliente = JSON.parse(JSON.stringify(res.data));
        this.novoCliente.patchValue(dadosCliente)
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }});
  }

  public addCliente(): void {

    if (this.new) {
      this.clienteService.addCliente(this.novoCliente.value).subscribe( {next: (res) => {
          this.alert.successMessage(res.message);
          this.router.navigate(['cadastros/clientes/listar']);
        }, error: (err) => {
          this.alert.errorMessage(err);
        }});
    } else {
      this.openDialogEdit();
    }
  }

  public cancelAddCliente() {
    // verifica se é edição ou cadastro novo
    if (!this.view && this.edit && !this.new){
      if (this.novoCliente.dirty){
        this.openDialogCancel()
      } else {
        this.view = true
        this.edit = false
        this.novoCliente.disable();
        return;
      }
    } else {
      if (this.novoCliente.dirty) {
        this.openDialogCancel()
      } else {
        this.router.navigate(['cadastros/clientes/listar'])
      }
    }
  }

  public buscaCep() {
    this.loading = true;
    this.buscaCepService.buscaCep(this.novoCliente.value.cep).subscribe({next: (res) => {
        this.alert.successMessage(res.message);
        let dadosCep = JSON.parse(JSON.stringify(res.data));
        this.novoCliente.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.novoCliente.get('bairro')?.patchValue(dadosCep.bairro);
        this.novoCliente.get('cidade')?.patchValue(dadosCep.localidade);
        this.novoCliente.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.novoCliente.get('estado')?.patchValue(dadosCep.uf);

      }, error: (err) => {
        this.alert.errorMessage(err);
      }})

    setTimeout(() => {
      this.loading = false;
    }, 1000)
  }

  public cancelarEdicao() {
    this.edit = !this.edit;
    this.novoCliente.disable()
  }

  public editar(): void {
    this.edit = !this.edit;
    this.view = !this.view;
    this.novoCliente.enable();
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
          this.novoCliente.disable();
          return;
        }
        this.router.navigate(['cadastros/clientes/listar'])
      }
    })
  }

  public openDialogEdit(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Editar Cadastro", descricao: "Deseja realmante editar as informações deste cadastro?", tipo: 'confirmacao' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.clienteService.editCliente(this.clienteId, this.novoCliente.value).subscribe({next: (res) => {
            this.alertService.successMessage(res.message);
            this.router.navigate(['cadastros/clientes/listar']);
          }, error: (err) => {
            this.alert.errorMessage(err);
          }});
      }
      return;
    })
  }

  public limpaForm(){
    this.novoCliente.get('cpf_cnpj')?.reset()
    this.novoCliente.get('rg_ie')?.reset()
    this.novoCliente.get('nome_razao_social')?.reset()
    this.novoCliente.get('mail')?.reset()
  }
}
