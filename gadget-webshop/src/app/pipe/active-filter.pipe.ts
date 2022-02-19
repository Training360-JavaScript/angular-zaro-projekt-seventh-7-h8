import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeFilter'
})
export class ActiveFilterPipe implements PipeTransform {

  transform<T extends {active: boolean}>(value: T[]|null): T[]|null {
    if (!value) return value;
    return value.filter(item => item.active);
  }
}
