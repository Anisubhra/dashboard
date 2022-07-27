import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortUname'
})
export class ShortUnamePipe implements PipeTransform {
  transform(fullName: string): any {
    return fullName
      .split("@")[0]
      .split(/(\d+)/)
      .map((n) => n[0])
      .join('');
  }
}
