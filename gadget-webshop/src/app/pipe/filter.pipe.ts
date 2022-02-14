import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], phrase: string): any[] {
    return value.filter((entity) => {
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
  }
}
