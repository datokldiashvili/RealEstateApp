import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    const resultArr: any = [];

    if (value.length === 0 || filterString === '' || propName === '') {
      return value;
    }

    value.forEach((prop) => {
      if (prop[propName] == filterString) {
        resultArr.push(prop);
      }
    });

    return resultArr;
  }
}
