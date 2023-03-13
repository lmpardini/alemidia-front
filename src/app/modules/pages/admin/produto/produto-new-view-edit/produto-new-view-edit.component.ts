import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "../../../../../core/services/usuario.service";
import { AlertService } from "../../../../../core/services/alert.service";
import { BuscaCepService } from "../../../../../core/services/busca-cep.service";
import { MatDialog } from "@angular/material/dialog";
import { DesejaCancelarComponent } from "../../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { ProdutoService } from "../../../../../core/services/produto.service";

@Component({
  selector: 'app-produto-new-view-edit',
  templateUrl: './produto-new-view-edit.component.html',
  styleUrls: ['./produto-new-view-edit.component.scss']
})
export class ProdutoNewViewEditComponent {

  public edit: boolean = true
  public view: boolean = false
  public new: boolean = false
  public id: number = 0;

  public confirmDialog: boolean = false

  novoProduto = this.fb.group({
    ativo: [true],
    nome: [null, Validators.required],
    quantidade_dia: [null, Validators.required],
    descricao: [null, Validators.required],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private produtoService: ProdutoService,
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
          this.getProduto(res['id']);
          this.novoProduto.disable();
          this.id = res['id'];
        } else {
          this.new = true;
        }
      }});
  }

  public getProduto(id:number) {
    this.produtoService.listById(id).subscribe({next: (res) => {
        let dados = JSON.parse(JSON.stringify(res.data));
        this.novoProduto.patchValue(dados)
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }});
  }

  public add(): void {
    if (this.new) {
      this.produtoService.store(this.novoProduto.value).subscribe( {next: (res) => {
          this.alert.successMessage(res.message);
          this.router.navigate(['admin/produtos/listar']);
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
      if (this.novoProduto.dirty){
        this.openDialogCancel()
      } else {
        this.view = true
        this.edit = false
        this.novoProduto.disable();
        return;
      }
    } else {
      if (this.novoProduto.dirty) {
        this.openDialogCancel()
      } else {
        this.router.navigate(['admin/produtos/listar'])
      }
    }
  }

  public cancelarEdicao() {
    this.edit = !this.edit;
    this.novoProduto.disable()
  }

  public editar(): void {
    this.edit = !this.edit;
    this.view = !this.view;
    this.novoProduto.enable();
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
          this.novoProduto.disable();
          return;
        }
        this.router.navigate(['admin/produtos/listar'])
      }
    })
  }

  public openDialogEdit(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Editar Cadastro", descricao: "Deseja realmante editar as informações deste cadastro?", tipo: 'confirmacao' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.produtoService.update(this.id, this.novoProduto.value).subscribe({next: (res) => {
            this.alertService.successMessage(res.message);
            this.router.navigate(['admin/produtos/listar']);
          }, error: (err) => {
            this.alert.errorMessage(err);
          }});
      }
      return;
    })
  }
}
