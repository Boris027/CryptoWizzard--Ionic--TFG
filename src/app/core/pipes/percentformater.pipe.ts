import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentformater',
  standalone: true
})
export class PercentformaterPipe implements PipeTransform {

  transform(value: number): string {
    let valuexd=value.toFixed(2);
    let devolver:string=""
    if(value>0){
      devolver+="+"+valuexd+"%"
    }else{
      devolver+=""+valuexd+"%"
    }

    return devolver;
  }

}
