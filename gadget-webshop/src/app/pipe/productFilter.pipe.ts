import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'productFilter',
})
export class ProductFilterPipe implements PipeTransform {
  transform<GenericEntity>(genericValue: GenericEntity[], phrase: string): GenericEntity[] {
    let value = genericValue as unknown as Product[];
    return <GenericEntity[]><unknown>value.filter((a) => {
      let numberPhrase = parseInt(phrase);
      if (!isNaN(numberPhrase)) {
        return a.price === numberPhrase;
      } else {
        return (
          a.name.toLowerCase().includes(phrase.toLowerCase()) ||
          a.description.toLowerCase().includes(phrase.toLowerCase()) ||
          a.type.toLowerCase().includes(phrase.toLowerCase()) ||
          a.category?.name.toLowerCase().includes(phrase.toLowerCase())
        );
      }
    });
  }
}
