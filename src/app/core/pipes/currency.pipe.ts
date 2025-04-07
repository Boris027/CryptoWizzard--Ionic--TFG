import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencypipe',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  transform(value: string): string {

    if(value=="gbp"){
      return "£"
    }else if(value=="eur"){
      return "€"
    }else{
      return "$"
    }

  }

}
