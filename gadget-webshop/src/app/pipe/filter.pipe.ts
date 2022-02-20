import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], phrase: string, paginateCount: any): any[] {
    if (!value) {
      paginateCount.cnt = 0;
      return value;
    }
    const ret = value.filter((entity) => {
      let numberPhrase = parseInt(phrase);
      if (!isNaN(numberPhrase)) {
        for (const [key, value] of Object.entries(entity)) {
          if (value === numberPhrase) return true;
        }
        return false;
      } else {
        for (const [key, value] of Object.entries(entity)) {
          if (typeof value === 'string') {
            if (value.toLowerCase().includes(phrase.toLowerCase())) return true;
          }
        }
        return false;
      }
    });
    paginateCount.cnt = ret.length;
    return ret;
  }
}
