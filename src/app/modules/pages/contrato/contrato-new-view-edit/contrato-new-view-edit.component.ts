import { Component } from '@angular/core';
import {
  AbstractControl, FormBuilder, UntypedFormGroup,  Validators,  FormArray,  UntypedFormArray,FormGroup, FormControl} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClienteService } from "../../../../core/services/cliente.service";
import { AlertService } from "../../../../core/services/alert.service";
import { BuscaCepService } from "../../../../core/services/busca-cep.service";
import { MatDialog } from "@angular/material/dialog";
import { DesejaCancelarComponent } from "../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { ProdutoService } from "../../../../core/services/produto.service";
import { debounceTime, map, tap } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { BuffetService } from "../../../../core/services/buffet.service";
import { AssessoriaService } from "../../../../core/services/assessoria.service";
import { ColaboradorService } from "../../../../core/services/colaborador.service";
import { CondicaoPagamentoService } from "../../../../core/services/admin/pagamento/condicao-pagamento.service";
import { FormaPagamentoService } from "../../../../core/services/admin/pagamento/forma-pagamento.service";

@Component({
  selector: 'app-contrato-new-view-edit',
  templateUrl: './contrato-new-view-edit.component.html',
  styleUrls: ['./contrato-new-view-edit.component.scss']
})
export class ContratoNewViewEditComponent {

  public clientes:any = [];
  public buffets:any = [];
  public assessorias:any = [];
  public vendedores:any = [];

  public edit: boolean = true
  public view: boolean = false
  public new: boolean = false
  public clienteId: number = 0;

  public condPgto: boolean = false;
  public exibeValorTotal:boolean = false;

  public etapa1: boolean = false;

  public confirmDialog: boolean = false

  public produtosAlemidia: any = [];
  public qtdeTotemDisponivel: any = []
  public qtdeCabineDisponivel: any = []



  public condicaoPgto: any = [];
  public formaPgto: any = [];

  novoEvento!: UntypedFormGroup
  formArray!: UntypedFormArray

  constructor( private fb: FormBuilder,
               private router: Router,
               private clienteService: ClienteService,
               private buffetService: BuffetService,
               private assessoriaService: AssessoriaService,
               private colaboradorService: ColaboradorService,
               private condicaoPagamentoService: CondicaoPagamentoService,
               private formaPagamentoService: FormaPagamentoService,
               private alert: AlertService,
               private buscaCepService: BuscaCepService,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private dialog: MatDialog,
               private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {

    this.listarProdutos();
    this.listarCondicoesPagamentos();

    this.createForm();

    this.activatedRoute.params.subscribe({next: (res) => {
        //se vier parametro de id, significa que é visualização. Então seta as variaveis de ocultar botões e busca por id no banco
        if (res['id']) {
          this.view = true;
          this.edit = false;

          this.novoEvento.disable();
          this.clienteId = res['id'];
        } else {
          this.new = true;
        }
      }});
  }

  public listarCondicoesPagamentos() {
    this.condicaoPagamentoService.list('').subscribe({
      next: (res) => {
        this.condicaoPgto = res.data;
      }
    })
  }

  public selectedCondicaoPgto() {

  }

  public listarProdutos() {
    this.produtoService.listarProduto().subscribe({next: (res) => {
        this.definirQtdeProdutosDisponiveis(res.data);
        this.produtosAlemidia = res.data;
      }
    })
  }

  private definirQtdeProdutosDisponiveis(data:any) {

    data.map((item: any) => {
      if (item.slug ==='totem') {
        for (let i = 1; i <= item.quantidade_dia; i++) {
          this.qtdeTotemDisponivel.push(i);
        }
      }
      if (item.slug ==='cabine') {
        for (let i = 1; i <= item.quantidade_dia; i++) {
          this.qtdeCabineDisponivel.push(i);
        }
      }
    })
  }

  public getCliente() {
    this.clienteService.listClientes('').subscribe({next: (res) => {
       this.clientes = res.data
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }});
  }

  public createForm() {

    this.novoEvento = this.fb.group({
      data_evento: [null, [Validators.required]],
      produtos: [null, Validators.required],
      noivo_debutante: [null, Validators.required],
      cliente: [null, [Validators.required, RequireMatch]],
      buffet: [null, [Validators.required, RequireMatch]],
      vendedor: [null, [Validators.required, RequireMatch]],
      assessoria: [null, [Validators.required, RequireMatch]],
      hora_inicio: [null],
      hora_fim: [null],
      qtde_convidados: [0, [Validators.required]],
      qtde_fotos_totem: [0, [Validators.required]],
      qtde_totem: [1, [Validators.required]],
      impressao_totem: [null, [Validators.required]],
      qtde_fotos_cabine: [0, [Validators.required]],
      qtde_cabine: [1, [Validators.required]],
      impressao_cabine: [null, [Validators.required]],
      robo_bazuca: [false, [Validators.required]],
      observacao:[null],
      condicao_pgto: [null, [Validators.required]],
      forma_pgto_padrao: [null],
      pagamento: this.fb.array([]),

      valor_total: [null, [Validators.required]],
      parcelas: [null]
    });

    this.formArray = this.novoEvento.get('pagamento') as UntypedFormArray

    function RequireMatch(control: AbstractControl) {
      const selection:any = control.value;
      if (typeof  selection === 'string'){
        return {incorrect: true}
      }
      return null
    }

    /**
     * TypeHead Clientes
      */
    this.novoEvento.get('cliente')?.valueChanges.pipe(
      debounceTime(300),
      map(value => typeof value === 'string' ? value.trim() : ''),
      filter(value => {
        if (value.length === 0) { this.clientes = []}
        return (value.length >2)
      }),
      switchMap(value => this.clienteService.listClientes(value))
    ).subscribe(res => this.clientes = res.data)

    /**
     * TypeHead Buffet
     */
    this.novoEvento.get('buffet')?.valueChanges.pipe(
      debounceTime(300),
      map(value => typeof value === 'string' ? value.trim() : ''),
      filter(value => {
        if (value.length === 0) { this.clientes = []}
        return (value.length >2)
      }),
      switchMap(value => this.buffetService.listBuffet(value))
    ).subscribe(res => this.buffets = res.data)

    /**
     * TypeHead Assessoria
     */
    this.novoEvento.get('assessoria')?.valueChanges.pipe(
      debounceTime(300),
      map(value => typeof value === 'string' ? value.trim() : ''),
      filter(value => {
        if (value.length === 0) { this.clientes = []}
        return (value.length > 1)
      }),
      switchMap(value => this.assessoriaService.listAssessoria(value))
    ).subscribe(res => this.assessorias = res.data)

    /**
     * TypeHead Vendedor
     */
    this.novoEvento.get('vendedor')?.valueChanges.pipe(
      debounceTime(300),
      map(value => typeof value === 'string' ? value.trim() : ''),
      filter(value => {
        if (value.length === 0) { this.clientes = []}
        return (value.length > 2)
      }),
      switchMap(value => this.colaboradorService.listVendedores(value))
    ).subscribe(res => this.vendedores = res.data)

  }

  get formArrayAsFormGroup(): UntypedFormGroup {
    return this.formArray as unknown as UntypedFormGroup;
  }

  handleCondPgto(event:string) {
    this.formArray.clear();
    this.exibeValorTotal = false;
    this.novoEvento.get('parcelas')?.patchValue(null)
    this.formaPgto = [];

    if (['a_vista'].includes(event) && this.formArray.length === 0) {
      this.exibeValorTotal = true;
      this.condicaoPgto.forEach((obj: any) => {
        if (obj.slug === 'a_vista') {
          this.formaPgto = obj.pagamento_forma_pagamento;
        }
      });
      this.formArray.push(this.fb.group({
        data_pagamento:[new Date().toISOString().substring(0, 10), Validators.required],
        //data_pagamento:[new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, ), Validators.required],
        valor: [this.novoEvento.get('valor_total')?.value, Validators.required],
        forma_pagamento: ['', Validators.required],
      }))
    }

    if (['parcelado'].includes(event) && this.formArray.length === 0) {
      this.exibeValorTotal = true;
      this.condicaoPgto.forEach((obj: any) => {
        if (obj.slug === 'parcelado') {
          this.formaPgto = obj.pagamento_forma_pagamento;
        }
      });
      this.formArray.push(this.fb.group({
        data_pagamento:[new Date().toISOString().substring(0, 10), Validators.required],
        valor: [this.novoEvento.get('valor_total')?.value, Validators.required],
        forma_pagamento: ['', Validators.required],
      }))
    }
  }

  public addOpcao(): void {
    this.formArray.clear();


    const valorTotal = this.novoEvento.get('valor_total')?.value;
    let parcelas = this.novoEvento.get('parcelas')?.value;
    const valorParcela = valorTotal / parcelas;

    for (var i = 0; i < parcelas; i++) {

      const data = new Date();
      data.setMonth(data.getMonth()+ i);

      let formaPagamento = '';
      this.formArray.controls.forEach(item => {
        item.get('valor')?.patchValue(valorParcela);
        item.get('forma_pagamento')?.patchValue(this.novoEvento.get('forma_pgto_padrao')?.value);
      })


      this.formArray.push(this.fb.group({
        data_pagamento:[data.toISOString().substring(0, 10), Validators.required],
        //data_pagamento:[new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substring(0, ), Validators.required],
        valor: [valorParcela, Validators.required],
        forma_pagamento: [formaPagamento, Validators.required],
      }));
    }
  }

  displayClientes(cliente:any):string {
    return cliente && cliente.nome_razao_social ? cliente.nome_razao_social: '';
  }

  displayBuffet(buffet:any):string {
    return buffet && buffet.nome_razao_social ? buffet.nome_razao_social: '';
  }

  displayAssessoria(assessoria:any):string {
    return assessoria && assessoria.nome_razao_social ? assessoria.nome_razao_social: '';
  }

  displayVendedores(vendedor:any):string {
    return vendedor && vendedor.nome ? vendedor.nome: '';
  }


  public cancelAdd() {
    // verifica se é edição ou cadastro novo
    if (!this.view && this.edit && !this.new){
      if (this.novoEvento.dirty){
        this.openDialogCancel()
      } else {
        this.view = true
        this.edit = false
        this.novoEvento.disable();
        return;
      }
    } else {
      if (this.novoEvento.dirty) {
        this.openDialogCancel()
      } else {
        this.router.navigate(['/contratos/listar'])
      }
    }
  }

  public cancelarEdicao() {
    this.edit = !this.edit;
    this.novoEvento.disable()
  }

  public editar(): void {
    this.edit = !this.edit;
    this.view = !this.view;
    this.novoEvento.enable();
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
          this.novoEvento.disable();
          return;
        }
        this.router.navigate(['contratos/listar'])
      }
    })
  }

  public openDialogEdit(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Editar Cadastro", descricao: "Deseja realmante editar as informações deste cadastro?", tipo: 'confirmacao' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.clienteService.editCliente(this.clienteId, this.novoEvento.value).subscribe({next: (res) => {
            this.alertService.successMessage(res.message);
            this.router.navigate(['cadastros/clientes/listar']);
          }, error: (err) => {
            this.alert.errorMessage(err);
          }});
      }
      return;
    })
  }



  public verificaDataProduto() {

    if (this.novoEvento.value.data_evento && this.novoEvento.value.produtos) {
      this.etapa1 = true;
    }

    this.novoEvento.get("produtos")?.valueChanges.subscribe({next: (value) => {

      if (this.novoEvento.get('produtos')?.errors?.['required'] && this.novoEvento.get('produtos')?.touched) {
        this.etapa1 = false
      }
    }});
  }

  public addContrato() {

  }

  teste() {
    console.log(this.novoEvento.value);
    console.log(this.formArray.value)

  }
}
