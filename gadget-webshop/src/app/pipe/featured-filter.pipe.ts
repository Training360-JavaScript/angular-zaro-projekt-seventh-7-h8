import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'featuredFilter'
})
export class FeaturedFilterPipe implements PipeTransform {

  transform<T extends {featured: boolean}>(value: T[]|null, featuredValue: boolean): T[]|null {
    if (!value || !value[0].hasOwnProperty('featured')) return value;
    return value.filter(item => item.featured === featuredValue);
  }

}
