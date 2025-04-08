import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatReal'
})
export class FormatRealPipe implements PipeTransform {
  transform(valor: number): string {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

}
