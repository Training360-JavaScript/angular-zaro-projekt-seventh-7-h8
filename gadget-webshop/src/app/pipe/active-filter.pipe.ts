import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeFilter'
})
export class ActiveFilterPipe implements PipeTransform {

  transform<T extends {active: boolean}>(value: T[]|null, activeValue: boolean): T[]|null {
    if (!value || !value[0].hasOwnProperty('active')) return value;
    return value.filter(item => item.active === activeValue);
  }
}
