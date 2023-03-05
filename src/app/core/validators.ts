import { AbstractControl, Validators } from "@angular/forms";

export class GenericValidator {
  constructor() {}

  /**
   * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
   */
  static ValidaCpf(controle: AbstractControl) {

    const value = controle.value;

    //se valor for vazio, retorna null
    if (!value){
      return null;
    }

    //validação para saber se é CPF
    if (value.length <= 11) {
      let somaCPF: number = 0;
      let restoCPF: number;
      let validoCPF: boolean;

      const regex = new RegExp('[0-9]{11}');

      if (
        value == '00000000000' ||
        value == '11111111111' ||
        value == '22222222222' ||
        value == '33333333333' ||
        value == '44444444444' ||
        value == '55555555555' ||
        value == '66666666666' ||
        value == '77777777777' ||
        value == '88888888888' ||
        value == '99999999999' ||
        !regex.test(value)
      )
        validoCPF = false;
      else {
        validoCPF = true;
        for (let i = 1; i <= 9; i++)
          somaCPF = somaCPF + parseInt(value.substring(i - 1, i)) * (11 - i);
        restoCPF = (somaCPF * 10) % 11;

        if (restoCPF == 10 || restoCPF == 11) restoCPF = 0;
        if (restoCPF != parseInt(value.substring(9, 10))) validoCPF = false;

        somaCPF = 0;
        for (let i = 1; i <= 10; i++)
          somaCPF = somaCPF + parseInt(value.substring(i - 1, i)) * (12 - i);
        restoCPF = (somaCPF * 10) % 11;

        if (restoCPF == 10 || restoCPF == 11) restoCPF = 0;
        if (restoCPF != parseInt(value.substring(10, 11))) validoCPF = false;

      }

      if (validoCPF) return null;

      return { cpfCnpjInvalido: true };
    }

    // validação cnpj

    if (value.length != 14)
      return { cpfCnpjInvalido: true };
    // LINHA 10 - Elimina CNPJs invalidos conhecidos
    if (value == "00000000000000" ||
        value == "11111111111111" ||
        value == "22222222222222" ||
        value == "33333333333333" ||
        value == "44444444444444" ||
        value == "55555555555555" ||
        value == "66666666666666" ||
        value == "77777777777777" ||
        value == "88888888888888" ||
        value == "99999999999999") {
      return { cpfCnpjInvalido: true };
    }

    let tamanho = value.length - 2
    let numeros = value.substring(0,tamanho);
    let digitos = value.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)){
      return { cpfCnpjInvalido: true };
    }

    tamanho = tamanho + 1;
    numeros = value.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1)) {
      return { cpfCnpjInvalido: true };
    }
    return null
  }

  static ValidaTelefone(controle: AbstractControl) {

    const value = controle.value;

    if (value) {
      if (value.startsWith('0') || value.startsWith('10')) {
        return { telefoneInvalido: true };

      }
      if (value.length < 10) {
        return { telefoneInvalido: true };
      }

      if (value == "1100000000" ||
          value == "1111111111" ||
          value == "2222222222" ||
          value == "3333333333" ||
          value == "4444444444" ||
          value == "5555555555" ||
          value == "6666666666" ||
          value == "7777777777" ||
          value == "8888888888" ||
          value == "9999999999" ||
          value == "11111111111"||
          value == "22222222222"||
          value == "33333333333"||
          value == "44444444444"||
          value == "55555555555"||
          value == "66666666666"||
          value == "77777777777"||
          value == "88888888888"||
          value == "99999999999"||
          value == "11123456789"||
          value == "11000000000"
      ) {
        return { telefoneInvalido: true };
      }
    }




    return null
  }
}
