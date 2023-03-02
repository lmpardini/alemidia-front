import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClienteService } from "../../../../../../core/services/cliente.service";
import { AlertService } from "../../../../../../core/services/alert.service";
import { BuscaCepService } from "../../../../../../core/services/busca-cep.service";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";

@Component({
  selector: 'app-clientes-criar',
  templateUrl: './clientes-criar.component.html',
  styleUrls: ['./clientes-criar.component.scss'],


})
export class ClientesCriarComponent implements OnInit{

  cliente:any;
  novoCliente = this.fb.group({
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

  public  tipoCadastro = this.novoCliente.value.tipo_cadastro;

  constructor( private fb: FormBuilder,
               private router: Router,
               private clienteService: ClienteService,
               private alert: AlertService,
               private buscaCepService: BuscaCepService,
  ) { }

  ngOnInit(): void {
  }

  public addCliente(): void {
    // @ts-ignore
    this.clienteService.addCliente(this.novoCliente.value).subscribe( {next: (res) => {
        this.alert.successMessage(res.message);
        this.router.navigate(['cadastros/clientes']);
      }, error: (err) => {
        this.alert.errorMessage(err);
      }});
  }

  public cancelAddCliente() {
    if (this.novoCliente.dirty) {
      alert("deseja realmente cancelar")
    } else {
      this.router.navigate(['cadastros/clientes'])
    }
  }

  public buscaCep() {
    console.log(this.novoCliente.value);
    this.buscaCepService.buscaCep(this.novoCliente.value.cep).subscribe({next: (res) => {
        this.alert.successMessage(res.message);

        console.log(res)

        let dadosCep = JSON.parse(JSON.stringify(res.data));
        this.novoCliente.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.novoCliente.get('bairro')?.patchValue(dadosCep.bairro);
        this.novoCliente.get('cidade')?.patchValue(dadosCep.localidade);
        this.novoCliente.get('logradouro')?.patchValue(dadosCep.logradouro);
        this.novoCliente.get('estado')?.patchValue(dadosCep.uf);

      }, error: (err) => {
        this.alert.errorMessage(err);
      }})
  }

}
