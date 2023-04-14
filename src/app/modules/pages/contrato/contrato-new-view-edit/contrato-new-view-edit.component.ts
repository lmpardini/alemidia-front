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
import { ContratoService } from "../../../../core/services/contrato.service";

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
  public contratoId: number = 0;
  public viewNroContrato = false
  public viewFirstEdit = false;
  public cancelContrato = false;

  public condPgto: boolean = false;
  public exibeValorTotal:boolean = false;

  public etapa1: boolean = false;

  public confirmDialog: boolean = false

  public produtosAlemidia: any = [];
  public qtdeTotemDisponivel: any = []
  public qtdeCabineDisponivel: any = []

  public produtosSelecionados:any = [];

  public condicaoPgto: any = [];
  public formaPgto: any = [];

  form!: UntypedFormGroup
  formArray!: UntypedFormArray
  produtosArray!: UntypedFormArray

  constructor( private fb: FormBuilder,
               private router: Router,
               private clienteService: ClienteService,
               private buffetService: BuffetService,
               private assessoriaService: AssessoriaService,
               private colaboradorService: ColaboradorService,
               private condicaoPagamentoService: CondicaoPagamentoService,
               private formaPagamentoService: FormaPagamentoService,
               private contratoService: ContratoService,
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
        /**
         *  se vier parametro de id, significa que é visualização. Então seta as variaveis de ocultar botões e busca por id no banco
         */

        if (res['id']) {
          this.view = true;
          this.edit = false;
          this.etapa1 = true

         this.getDadosContrato(res['id']);

          this.form.disable();
          this.contratoId = res['id'];
          this.viewNroContrato = true;
        } else {
          this.new = true;
        }
      }});
  }

  async getDadosContrato(id:any) {
    return new Promise(resolve => {
      let produtos: any = [];
      this.contratoService.listById(id).subscribe({next: async (res) => {
          let dadosContrato = JSON.parse(JSON.stringify(res.data));
          this.form.patchValue(dadosContrato);

          /**
           * Carrega as informações de pagamentos no FormArray
           */

          this.form.get('condicao_pgto')?.patchValue(dadosContrato.condicao_pagamento.slug)

          if (['a_vista', 'parcelado'].includes(this.form.get('condicao_pgto')?.value)) {
            this.exibeValorTotal = true;
          }

          this.condicaoPgto.forEach((item: any) => {
            if (item.slug === this.form.get('condicao_pgto')?.value) {
              this.formaPgto = item.pagamento_forma_pagamento;
            }
          });

          await dadosContrato.contrato_pagamento?.forEach((obj: any) => {
            this.formArray.push(this.fb.group({
              data_pagamento: [obj.data_pagamento, Validators.required],
              valor: [obj.valor, Validators.required],
              forma_pagamento: [obj.forma_pagamento.slug, Validators.required],
            }));
          });
          this.formArray.disable();

          /**
           * Carrega as informações de produtos no FormArray
           */
          dadosContrato.contrato_produto.forEach((obj: any) => {
            let produto = this.produtosAlemidia.find((ele: any) => ele.id === obj.produto_id);
            produtos.push(produto.slug);

            if (['totem', 'cabine'].includes(produto.slug)) {
              this.produtosArray.push(this.fb.group({
                produto: [produto.slug],
                quantidade: [obj.quantidade, Validators.required],
                quantidade_foto: [obj.quantidade_foto, Validators.required],
                impressao: [obj.impressao, Validators.required],
                tempo_evento: [obj.tempo_evento, Validators.required],
                bazuca: [obj.bazuca]
              }));
              return;
            }

            if (['espelho_magico'].includes(produto.slug)) {
              this.produtosArray.push(this.fb.group({
                produto: [produto.slug],
                quantidade: [obj.quantidade, Validators.required],
                quantidade_foto: [obj.quantidade_foto, Validators.required],
                impressao: [obj.impressao],
                tempo_evento: [obj.tempo_evento, Validators.required],
                bazuca: [obj.bazuca]
              }));
              return;
            }

            if (['robo_led'].includes(produto.slug)) {
              this.produtosArray.push(this.fb.group({
                produto: [produto.slug],
                quantidade: [obj.quantidade, Validators.required],
                quantidade_foto: [obj.quantidade_foto],
                impressao: [obj.impressao],
                tempo_evento: [obj.tempo_evento, Validators.required],
                bazuca: [obj.bazuca]
              }));
              return;
            }
            this.produtosArray.push(this.fb.group({
              produto: [produto.slug],
              quantidade: [obj.quantidade, Validators.required],
              quantidade_foto: [obj.quantidade_foto],
              impressao: [obj.impressao],
              tempo_evento: [obj.tempo_evento, Validators.required],
              bazuca: [obj.bazuca]
            }));
          });
          resolve(true);
          this.produtosArray.disable();
        }});
    });
  }

  public listarCondicoesPagamentos() {
    this.condicaoPagamentoService.listActive().subscribe({
      next: (res) => {
        this.condicaoPgto = res.data;
      }
    })
  }

  public listarProdutos() {
    this.produtoService.listarProduto().subscribe({next: (res) => {
      this.produtosAlemidia = res.data;
      }
    })
  }

  public definirQtdeProdutosDisponiveis(slug:string) {

    let produtoDisponivel: number[] = []

    this.produtosAlemidia.map((item: any) => {
      if (item.slug === slug) {
        for (let i = 1; i <= item.quantidade_dia; i++) {
          produtoDisponivel.push(i);
        }
        return
      }
    })
    return produtoDisponivel
  }

  public createForm() {
    this.form = this.fb.group({
      id: [{value:null, disabled:true}],
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
      observacoes:[null],
      observacao_pagamento:[null],
      condicao_pgto: [null, [Validators.required]],
      pagamento: this.fb.array([]),
      produtos_selecionados: this.fb.array([]),
      valor_total: [null],
      forma_pgto_padrao: [null],
      parcelas: [null]
    });

    this.formArray = this.form.get('pagamento') as UntypedFormArray
    this.produtosArray = this.form.get('produtos_selecionados') as UntypedFormArray

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
    this.form.get('cliente')?.valueChanges.pipe(
      debounceTime(300),
      map(value => typeof value === 'string' ? value.trim() : ''),
      filter(value => {
        if (value.length === 0) { this.clientes = []}
        return (value.length >2)
      }),
      switchMap(value => this.clienteService.listActive(value))
    ).subscribe(res => this.clientes = res.data)

    /**
     * TypeHead Buffet
     */
    this.form.get('buffet')?.valueChanges.pipe(
      debounceTime(300),
      map(value => typeof value === 'string' ? value.trim() : ''),
      filter(value => {
        if (value.length === 0) { this.clientes = []}
        return (value.length >2)
      }),
      switchMap(value => this.buffetService.listActive(value))
    ).subscribe(res => this.buffets = res.data)

    /**
     * TypeHead Assessoria
     */
    this.form.get('assessoria')?.valueChanges.pipe(
      debounceTime(300),
      map(value => typeof value === 'string' ? value.trim() : ''),
      filter(value => {
        if (value.length === 0) { this.clientes = []}
        return (value.length > 1)
      }),
      switchMap(value => this.assessoriaService.listActive(value))
    ).subscribe(res => this.assessorias = res.data)

    /**
     * TypeHead Vendedor
     */
    this.form.get('vendedor')?.valueChanges.pipe(
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

  get produtosArrayAsFormGroup(): UntypedFormGroup {
    return this.produtosArray as unknown as UntypedFormGroup;
  }

  handleCondPgto(event:string) {
    this.formArray.clear();
    this.exibeValorTotal = false;
    this.form.get('parcelas')?.patchValue(null)
    this.formaPgto = [];

    this.condicaoPgto.forEach((obj: any) => {
      if (obj.slug === event) {
        this.formaPgto = obj.pagamento_forma_pagamento;
      }
    });

    if (['a_vista'].includes(event) && this.formArray.length === 0) {
      this.exibeValorTotal = true;
      this.formArray.push(this.fb.group({
        data_pagamento:[new Date().toISOString().substring(0, 10), Validators.required],
        valor: [this.form.get('valor_total')?.value, Validators.required],
        forma_pagamento: ['', Validators.required],
      }))
    }

    if (['parcelado'].includes(event) && this.formArray.length === 0) {
      this.exibeValorTotal = true;
      this.formArray.push(this.fb.group({
        data_pagamento:[new Date().toISOString().substring(0, 10), Validators.required],
        valor: [this.form.get('valor_total')?.value, Validators.required],
        forma_pagamento: ['', Validators.required],
      }))
    }

    if (['permuta', 'contrato_fake', 'cortesia'].includes(event) && this.formArray.length === 0) {
      this.formArray.push(this.fb.group({
        data_pagamento:[new Date().toISOString().substring(0, 10), Validators.required],
        valor: [0 , Validators.required],
        forma_pagamento: ['sem_custo', Validators.required],
      }))
    }
  }

  public addOpcao(): void {
    this.formArray.clear();

    const valorTotal = this.form.get('valor_total')?.value;
    let parcelas = this.form.get('parcelas')?.value;
    const valorParcela = valorTotal / parcelas;

    for (var i = 0; i < parcelas; i++) {

      const data = new Date();
      data.setMonth(data.getMonth()+ i);

      let formaPagamento = this.form.get('forma_pgto_padrao')?.value;
      this.formArray.controls.forEach(item => {
        item.get('valor')?.patchValue(valorParcela);
        item.get('forma_pagamento')?.patchValue(formaPagamento);
      })

      this.formArray.push(this.fb.group({
        data_pagamento:[data.toISOString().substring(0, 10), Validators.required],
        valor: [valorParcela, Validators.required],
        forma_pagamento: [formaPagamento, Validators.required],
      }));
    }
  }

  public recalculaValorParcela(index: any) {

    let valorTotal = this.form.get('valor_total')?.value;

    let valorParcelaAlterada = this.formArray.controls[index].value.valor;

    let somaParcelasAnteriores = 0;

    let valorFaltante = 0

    this.formArray.controls.forEach((item, i) => {
      if (i < index) {
        somaParcelasAnteriores += item.get('valor')?.value
        return
      }

      if (i === index){
        valorFaltante = valorTotal - somaParcelasAnteriores - valorParcelaAlterada
      }

      if (i > index){
        item.get('valor')?.patchValue(valorFaltante/(this.formArray.length - (index+1)));
      }

    });
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
      if (this.form.dirty){
        this.openDialogCancel()
      } else {
        this.view = true
        this.edit = false
        this.form.disable();
        return;
      }
    } else {
      if (this.form.dirty) {
        this.openDialogCancel()
      } else {
        this.router.navigate(['/contratos/listar'])
      }
    }
  }

  public cancelarEdicao() {
    this.edit = !this.edit;
    this.form.disable()
  }

  public editar(): void {
    this.edit = !this.edit;
    this.view = !this.view;
    this.cancelContrato = true;
    this.form.enable();
    this.viewFirstEdit = true

    this.verificaAlteracaoCampoDataProduto();
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
          this.getDadosContrato(this.contratoId)
          this.form.disable();
          return;
        }
        this.router.navigate(['contratos/listar'])
      }
    })
  }

  public openDialogCancelarContrato(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: {
        titulo: "Cancelar Contrato",
        descricao: "Deseja realmante cancelar este contrato? Está ação não poderá ser desfeita!",
        tipo: 'advertencia'
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.contratoService.destroy(this.contratoId).subscribe({next: (res) => {
          this.alertService.successMessage(res.message);
            this.router.navigate(['contratos/listar'])
          }});
      }
    })
  }

  public openDialogEdit(): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: { titulo: "Editar Cadastro", descricao: "Deseja realmante editar as informações deste cadastro?", tipo: 'confirmacao' }
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.contratoService.update(this.contratoId, this.form.value).subscribe({next: async (res) => {
            this.alertService.successMessage(res.message);
            await this.openModalAddContrato();
            // await this.openModalEnviaEmailContrato();
            this.router.navigate(['/contratos/listar'])
          }, error: (err) => {
            this.alert.errorMessage(err);
          }});
      }
      return;
    })
  }

  async openModalProduto(produtos:any) {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(DesejaCancelarComponent, {
        data: {
          titulo: "Atenção",
          descricao: "Os produtos abaixo não estão disponíveis para a data selecionada. Deseja realmente continuar com a venda?",
          tipo: 'advertencia',
          produtos: produtos,
        }
      });
      dialogRef.afterClosed().subscribe( res => {
        if (res) {
          resolve(true)
        } else {
          this.router.navigate(['/contratos/listar'])
        }
      })
    })
  }

  async openModalAddContrato() {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(DesejaCancelarComponent, {
        data: {
          titulo: "Contrato cadastrado com Sucesso",
          descricao: "Deseja imprimir a via do contrato?",
          tipo: 'aviso',
        }
      });
      dialogRef.afterClosed().subscribe( res => {
        if (res) {
          this.contratoService.imprimirContrato(this.contratoId);
          resolve(true)
        } else {
          this.router.navigate(['/contratos/listar'])
        }
      })
    })
  }

  async openModalEnviaEmailContrato() {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(DesejaCancelarComponent, {
        data: {
          titulo: "Envio email",
          descricao: "Deseja enviar por email ao contratante uma via do contrato?",
          tipo: 'aviso',
        }
      });
      dialogRef.afterClosed().subscribe( res => {
        if (res) {
          resolve(true)
        } else {
          this.router.navigate(['/contratos/listar'])
        }
      })
    })
  }

  async verificaDataProduto(teste:boolean) {

    if (!this.etapa1 && teste) {
      return
    }
    this.produtosArray.clear();

    let produtos: any[] = [];

    this.form.get('produtos')?.value.forEach((obj:any) => {
      produtos.push(obj);
    });

    this.verificaProdutoApi(produtos);

    this.etapa1 = true;

    this.criarArrayProdutos();

    this.verificaAlteracaoCampoDataProduto();

  }

  private verificaAlteracaoCampoDataProduto() {

    let produtos: any[] = [];
    this.form.get("produtos")?.valueChanges.subscribe({next: async (value) => {
        this.produtosArray.clear();
        let produtos: any[] = [];
        if ((this.form.get('produtos')?.touched && this.form.get('data_evento')?.touched) || (this.edit && !this.view && !this.new && this.viewFirstEdit)) {
          this.form.get('produtos')?.value.forEach((obj:any) => {
            produtos.push(obj);
          });

          this.verificaProdutoApi(produtos);
          this.criarArrayProdutos();

          if (this.form.get('produtos')?.errors?.['required'] && this.form.get('produtos')?.touched) {
            this.etapa1 = false
          }
        }
      }});

    this.form.get("data_evento")?.valueChanges.subscribe({next: async (value) => {
        this.produtosArray.clear();
        if ((this.form.get('produtos')?.touched && this.form.get('data_evento')?.touched) || (this.edit && !this.view && !this.new)) {
          let produtos: any[] = [];

          if( this.form.get('produtos')?.value) {
            this.form.get('produtos')?.value.forEach((obj:any) => {
              produtos.push(obj);
            });

            this.verificaProdutoApi(produtos);
            this.criarArrayProdutos();

            if (this.form.get('produtos')?.errors?.['required'] && this.form.get('produtos')?.touched) {
              this.etapa1 = false
            }
          }
        }
      }});
  }

  public criarArrayProdutos() {
    let produtos =  this.form.get('produtos')?.value;

    if (produtos.length > 0) {
      produtos.forEach((item:any) => {
        if (['totem', 'cabine'].includes(item)) {
          this.produtosArray.push(this.fb.group({
            produto: [item],
            quantidade: [1, Validators.required],
            quantidade_foto: [0, Validators.required],
            impressao: ['definir', Validators.required],
            tempo_evento: [4, Validators.required],
            bazuca: [null]
          }));
          return;
        }

        if (['espelho_magico'].includes(item)) {
          this.produtosArray.push(this.fb.group({
            produto: [item],
            quantidade: [1, Validators.required],
            quantidade_foto: [0, Validators.required],
            impressao: [null],
            tempo_evento: [4, Validators.required],
            bazuca: [null]
          }));
          return;
        }

        if (['robo_led'].includes(item)) {
          this.produtosArray.push(this.fb.group({
            produto: [item],
            quantidade: [1],
            quantidade_foto: [null],
            impressao: [null],
            tempo_evento: [1, Validators.required],
            bazuca:[1]
          }));
          return;
        }
        this.produtosArray.push(this.fb.group({
          produto: [item],
          quantidade: [1, Validators.required],
          quantidade_foto: [null],
          impressao: [null],
          tempo_evento: [null, Validators.required],
          bazuca: [null]
        }));
      });
    }
  }

  public getNameCardProduto(slug:string) {
    let value = this.produtosAlemidia.find((ele: any) => ele.slug === slug)

    if (value) {
      return value['nome']
    }
  }

  public alteraDataParcelamento(index:number) {
      const data = new Date(this.formArray.controls[index].value.data_pagamento);

      this.formArray.controls.forEach((item, i) => {
        if(i > index){
          data.setMonth(data.getMonth()+ 1);
          item.get('data_pagamento')?.patchValue(data.toISOString().substring(0, 10));
        }
      })
  }

  async save() {
    if (this.new) {
      this.contratoService.store(this.form.value).subscribe({next: async (res) => {
          this.alertService.successMessage(res.message);
          this.contratoId = res.id;
          await this.openModalAddContrato();
          // await this.openModalEnviaEmailContrato();
          this.router.navigate(['/contratos/listar'])
        }});
      return
    }
    this.openDialogEdit();
  }

  private verificaProdutoApi(produtos:any) {
    this.contratoService.verificaDataProduto({id: this.form.get('id')?.value ,data_evento:this.form.get('data_evento')?.value, produtos}).subscribe({next: async (res) => {
      if (res.agenda) {
          await this.openModalProduto(res.data);
        }
      }
    });
  }

  public cancelarContrato() {
    this.openDialogCancelarContrato();
  }

  public imprimirContrato(): void {
    this.contratoService.imprimirContrato(this.contratoId)
  }
}
