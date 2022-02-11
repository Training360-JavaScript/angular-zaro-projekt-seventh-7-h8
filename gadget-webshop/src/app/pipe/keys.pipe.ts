import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform<T>(value: T, ...args: unknown[]): string[] {
    return Object.keys(value);
  }

}
