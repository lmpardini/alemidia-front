import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { GenericValidator } from "../../../../../core/validators";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../../../../core/services/alert.service";
import { BuscaCepService } from "../../../../../core/services/busca-cep.service";
import { MatDialog } from "@angular/material/dialog";
import { DesejaCancelarComponent } from "../../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { ColaboradorService } from "../../../../../core/services/colaborador.service";

@Component({
  selector: 'app-colaborador-new-view-edit',
  templateUrl: './colaborador-new-view-edit.component.html',
  styleUrls: ['./colaborador-new-view-edit.component.scss']
})
export class ColaboradorNewViewEditComponent {

  public funcoes:any = [];

  public edit: boolean = true
  public view: boolean = false
  public new: boolean = false
  public id: number = 0;

  public confirmDialog: boolean = false

  novoColaborador = this.fb.group({
    ativo: [true],
    nome: [null, Validators.required],
    mail: [null, [Validators.required, Validators.email]],
    telefone: [null, Validators.compose([GenericValidator.ValidaTelefone])],
    celular: [null, Validators.compose([Validators.required, GenericValidator.ValidaTelefone])],
    celular2: [null, Validators.compose([GenericValidator.ValidaTelefone])],
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    numero: [null, Validators.required],
    complemento: [null],
    bairro: [null, Validators.required],
    cidade: [null, Validators.required],
    estado: [null, Validators.required],
    banco: [null],
    agencia: [null],
    cc: [null],
    cpf_cnpj: [null, Validators.compose([GenericValidator.ValidaCpf])],
    chave_pix: [null],
    comissao: [null],
    funcao: [null, Validators.required],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private colaboradorService: ColaboradorService,
               private alert: AlertService,
               private buscaCepService: BuscaCepService,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFuncoes();
    this.activatedRoute.params.subscribe({next: (res) => {
        //se vier parametro de id, significa que é visualização. Então seta as variaveis de ocultar botões e busca por id no banco
        if (res['id']) {
          this.view = true;
          this.edit = false;
          this.getColaborador(res['id']);
          this.novoColaborador.disable();
          this.id = res['id'];
        } else {
          this.new = true;
        }
      }});

  }

  public getColaborador(id:number) {
    this.colaboradorService.listById(id).subscribe({next: (res) => {
        let dadosBuffet = JSON.parse(JSON.stringify(res.data));
        this.novoColaborador.patchValue(dadosBuffet)
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }});
  }

  public add(): void {
    console.log(this.novoColaborador.value)
    if (this.new) {
      console.log(this.novoColaborador.value);
      this.colaboradorService.store(this.novoColaborador.value).subscribe( {next: (res) => {
          this.alert.successMessage(res.message);
          this.router.navigate(['admin/colaboradores/listar']);
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
      if (this.novoColaborador.dirty){
        this.openDialogCancel()
      } else {
        this.view = true
        this.edit = false
        this.novoColaborador.disable();
        return;
      }
    } else {
      if (this.novoColaborador.dirty) {
        this.openDialogCancel()
      } else {
        this.router.navigate(['admin/colaboradores/listar'])
      }
    }
  }

  public buscaCep() {

    this.buscaCepService.buscaCep(this.novoColaborador.value.cep).subscribe({next: (res) => {
        this.alert.successMessage(res.message);
        let dadosCep = JSON.parse(JSON.stringify(res.data));
        this.novoColaborador.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.novoColaborador.get('bairro')?.patchValue(dadosCep.bairro);
        this.novoColaborador.get('cidade')?.patchValue(dadosCep.localidade);
        this.novoColaborador.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.novoColaborador.get('estado')?.patchValue(dadosCep.uf);

      }, error: (err) => {
        this.alert.errorMessage(err);
      }})
  }

  public cancelarEdicao() {
    this.edit = !this.edit;
    this.novoColaborador.disable()
  }

  public editar(): void {
    this.edit = !this.edit;
    this.view = !this.view;
    this.novoColaborador.enable();
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
          this.novoColaborador.disable();
          return;
        }
        this.router.navigate(['admin/colaboradores/listar'])
      }
    })
  }

  public openDialogEdit(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Editar Cadastro", descricao: "Deseja realmante editar as informações deste cadastro?", tipo: 'confirmacao' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.colaboradorService.update(this.id, this.novoColaborador.value).subscribe({next: (res) => {
            this.alertService.successMessage(res.message);
            this.router.navigate(['admin/colaboradores/listar']);
          }, error: (err) => {
            this.alert.errorMessage(err);
          }});
      }
      return;
    })
  }

  public getFuncoes() {
    this.colaboradorService.getFuncoes().subscribe({next: (res) => {
    this.funcoes = res.data
    }})
  }
}
