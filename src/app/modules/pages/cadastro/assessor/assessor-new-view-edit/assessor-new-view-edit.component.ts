import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { GenericValidator } from "../../../../../core/validators";
import { ActivatedRoute, Router } from "@angular/router";
import { BuffetService } from "../../../../../core/services/buffet.service";
import { AlertService } from "../../../../../core/services/alert.service";
import { BuscaCepService } from "../../../../../core/services/busca-cep.service";
import { MatDialog } from "@angular/material/dialog";
import { DesejaCancelarComponent } from "../../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { AssessoriaService } from "../../../../../core/services/assessoria.service";

@Component({
  selector: 'app-assessor-new-view-edit',
  templateUrl: './assessor-new-view-edit.component.html',
  styleUrls: ['./assessor-new-view-edit.component.scss']
})
export class AssessorNewViewEditComponent {

  assessoria:any;

  public edit: boolean = true
  public view: boolean = false
  public new: boolean = false
  public assessoriaId: number = 0;

  public confirmDialog: boolean = false

  novoAssessor = this.fb.group({
    tipo_cadastro: ['pj'],
    ativo: [true],
    nome_razao_social: [null, Validators.required],
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
  });

  public  tipoCadastro = this.novoAssessor.value.tipo_cadastro;

  constructor( private fb: FormBuilder,
               private router: Router,
               private assessoriaService: AssessoriaService,
               private alert: AlertService,
               private buscaCepService: BuscaCepService,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.novoAssessor.errors);
    this.activatedRoute.params.subscribe({next: (res) => {
        //se vier parametro de id, significa que é visualização. Então seta as variaveis de ocultar botões e busca por id no banco
        if (res['id']) {
          this.view = true;
          this.edit = false;
          this.getAssessor(res['id']);
          this.novoAssessor.disable();
          this.assessoriaId = res['id'];
        } else {
          this.new = true;
        }
      }});
  }

  public getAssessor(id:number) {
    this.assessoriaService.listAssessoriaById(id).subscribe({next: (res) => {
        let dadosBuffet = JSON.parse(JSON.stringify(res.data));
        this.novoAssessor.patchValue(dadosBuffet)
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }});
  }

  public addAssessor(): void {
    if (this.new) {
      console.log(this.novoAssessor.value);
      this.assessoriaService.addAssessoria(this.novoAssessor.value).subscribe( {next: (res) => {
          this.alert.successMessage(res.message);
          this.router.navigate(['cadastros/assessores/listar']);
        }, error: (err) => {
          this.alert.errorMessage(err);
        }});
    } else {
      this.openDialogEdit();
    }
  }

  public cancelAddAssessor() {
    // verifica se é edição ou cadastro novo
    if (!this.view && this.edit && !this.new){
      if (this.novoAssessor.dirty){
        this.openDialogCancel()
      } else {
        this.view = true
        this.edit = false
        this.novoAssessor.disable();
        return;
      }
    } else {
      if (this.novoAssessor.dirty) {
        this.openDialogCancel()
      } else {
        this.router.navigate(['cadastros/assessores/listar'])
      }
    }
  }

  public buscaCep() {

    this.buscaCepService.buscaCep(this.novoAssessor.value.cep).subscribe({next: (res) => {
        this.alert.successMessage(res.message);
        let dadosCep = JSON.parse(JSON.stringify(res.data));
        this.novoAssessor.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.novoAssessor.get('bairro')?.patchValue(dadosCep.bairro);
        this.novoAssessor.get('cidade')?.patchValue(dadosCep.localidade);
        this.novoAssessor.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.novoAssessor.get('estado')?.patchValue(dadosCep.uf);

      }, error: (err) => {
        this.alert.errorMessage(err);
      }})
  }

  public cancelarEdicao() {
    this.edit = !this.edit;
    this.novoAssessor.disable()
  }

  public editar(): void {
    this.edit = !this.edit;
    this.view = !this.view;
    this.novoAssessor.enable();
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
          this.novoAssessor.disable();
          return;
        }
        this.router.navigate(['cadastros/assessores/listar'])
      }
    })
  }

  public openDialogEdit(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Editar Cadastro", descricao: "Deseja realmante editar as informações deste cadastro?", tipo: 'confirmacao' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.assessoriaService.editAssessoria(this.assessoriaId, this.novoAssessor.value).subscribe({next: (res) => {
            this.alertService.successMessage(res.message);
            this.router.navigate(['cadastros/assessores/listar']);
          }, error: (err) => {
            this.alert.errorMessage(err);
          }});
      }
      return;
    })
  }
}
