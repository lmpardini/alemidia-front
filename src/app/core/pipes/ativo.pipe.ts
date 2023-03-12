import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ativo'
})
export class AtivoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value){
      return "Sim";
    } else {
      return "Não"
    }
  }
}
