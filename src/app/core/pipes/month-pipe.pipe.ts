import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthPipe'
})
export class MonthPipe implements PipeTransform {

  transform(value: any): any {
    let firstLetter = value.substr(0,1).toUpperCase()
    let text = value.substr(1).toLowerCase()
    return firstLetter+text;
  }

}
