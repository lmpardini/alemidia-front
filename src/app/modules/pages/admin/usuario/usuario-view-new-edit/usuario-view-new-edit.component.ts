import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../../../../core/services/alert.service";
import { BuscaCepService } from "../../../../../core/services/busca-cep.service";
import { MatDialog } from "@angular/material/dialog";
import { DesejaCancelarComponent } from "../../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { UsuarioService } from "../../../../../core/services/usuario.service";

@Component({
  selector: 'app-usuario-view-new-edit',
  templateUrl: './usuario-view-new-edit.component.html',
  styleUrls: ['./usuario-view-new-edit.component.scss']
})
export class UsuarioViewNewEditComponent {

  public edit: boolean = true
  public view: boolean = false
  public new: boolean = false
  public id: number = 0;

  public confirmDialog: boolean = false

  public perfilUsuario:any = [];

  novoUsuario = this.fb.group({
    ativo: [true],
    nome: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    usuario: [null, Validators.required],
    role: [null, Validators.required],
  });

  public loading = false;

  constructor( private fb: FormBuilder,
               private router: Router,
               private usuarioService: UsuarioService,
               private alert: AlertService,
               private buscaCepService: BuscaCepService,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPerfilAcesso();
    this.activatedRoute.params.subscribe({next: (res) => {
        //se vier parametro de id, significa que é visualização. Então seta as variaveis de ocultar botões e busca por id no banco
        if (res['id']) {
          this.view = true;
          this.edit = false;
          this.getUsuario(res['id']);
          this.novoUsuario.disable();
          this.id = res['id'];
        } else {
          this.new = true;
        }
      }});
  }

  public getUsuario(id:number) {
    this.usuarioService.listById(id).subscribe({next: (res) => {
        let dados = JSON.parse(JSON.stringify(res.data));
        console.log(dados)
        this.novoUsuario.patchValue(dados)
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }});
  }

  public add(): void {
    if (this.new) {
      console.log(this.novoUsuario.value);
      this.usuarioService.add(this.novoUsuario.value).subscribe( {next: (res) => {
          this.alert.successMessage(res.message);
          this.router.navigate(['admin/usuarios/listar']);
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
      if (this.novoUsuario.dirty){
        this.openDialogCancel()
      } else {
        this.view = true
        this.edit = false
        this.novoUsuario.disable();
        return;
      }
    } else {
      if (this.novoUsuario.dirty) {
        this.openDialogCancel()
      } else {
        this.router.navigate(['admin/usuarios/listar'])
      }
    }
  }

  public cancelarEdicao() {
    this.edit = !this.edit;
    this.novoUsuario.disable()
  }

  public editar(): void {
    this.edit = !this.edit;
    this.view = !this.view;
    this.novoUsuario.enable();
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
          this.novoUsuario.disable();
          return;
        }
        this.router.navigate(['admin/usuarios/listar'])
      }
    })
  }

  public openDialogEdit(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Editar Cadastro", descricao: "Deseja realmante editar as informações deste cadastro?", tipo: 'confirmacao' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.usuarioService.update(this.id, this.novoUsuario.value).subscribe({next: (res) => {
            this.alertService.successMessage(res.message);
            this.router.navigate(['admin/usuarios/listar']);
          }, error: (err) => {
            this.alert.errorMessage(err);
          }});
      }
      return;
    })
  }

  public getPerfilAcesso() {
    this.usuarioService.listPerfilUsuario().subscribe({next: (res) => {
      this.perfilUsuario = res.data;
      console.log(this.perfilUsuario)
      }
    })
  }

  public redefinirSenha(){
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Redefinir Senha", descricao: "Deseja realmante redefinir a senha para este usuário?", tipo: 'warning' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.usuarioService.redefinirSenha(this.id, this.perfilUsuario.value).subscribe({next: (res) => {
          this.alertService.successMessage(res.message);
          this.router.navigate(['admin/usuarios/listar']);
          }})
      }
      return;
    })
  }
}
