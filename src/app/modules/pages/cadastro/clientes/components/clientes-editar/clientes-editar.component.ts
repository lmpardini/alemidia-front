import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ClienteService } from "../../../../../../core/services/cliente.service";
import { AlertService } from "../../../../../../core/services/alert.service";

@Component({
  selector: 'app-clientes-editar',
  templateUrl: './clientes-editar.component.html',
  styleUrls: ['./clientes-editar.component.scss']
})
export class ClientesEditarComponent implements OnInit{

  cliente:any;

  public edit: boolean = false

  public empresaId: any;

  cadastroCliente = this.fb.group({
    tipo_cadastro: ['pf'],
    nome_razao_social: [null, Validators.required],
    mail: [null, [Validators.required, Validators.email]],
    cpf_cnpj: [null, Validators.required],
    rg_ie: [null, Validators.required],
    telefone: [null],
    celular: [null, Validators.required],
    celular2: [null],
    logradouro: [null, Validators.required],
    numero: [null, Validators.required],
    complemento: [null],
    bairro: [null, Validators.required],
    cidade: [null, Validators.required],
    estado: [null, Validators.required],
    cep: [null, Validators.required],
  });

  constructor(private fb: FormBuilder,
              private activatedRoute:ActivatedRoute,
              private clienteService: ClienteService,
              private alertService: AlertService

  ) {
  }
  ngOnInit(): void {
    this.cadastroCliente.disable();
    this.activatedRoute.params.subscribe({next: (res) => {
        this.empresaId = res;
    }});

    this.getCliente(this.empresaId.id);
  }

  public getCliente(id:number) {
    this.clienteService.listClientesbyId(id).subscribe({next: (res) => {
      let dadosCliente = JSON.parse(JSON.stringify(res.data));
      this.cadastroCliente.patchValue(dadosCliente)
      }, error: (err) => {
        this.alertService.errorMessage(err);
      }});
  }

  public editar(): void {
    this.edit = !this.edit;
    this.cadastroCliente.enable();
  }

  public cancelarEdicao() {
    this.edit = !this.edit;
    this.cadastroCliente.disable()

  }

  public editarCliente() {

  }
}
