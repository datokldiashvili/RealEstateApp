import { Pipe, PipeTransform } from '@angular/core';
import { Property } from '../model/property/property';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Array<Property>, args: any[]): Property[] {
    const sortField = args[0];
    const sortOrder = args[1];
    let multiplier = 1;

    if (sortOrder === 'Descending') {
      multiplier = -1;
    }

    // Initially ascending
    value.sort((a: any, b: any) => {
      if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      } else if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      }
      return 0;
    });
    return value;
  }
}
