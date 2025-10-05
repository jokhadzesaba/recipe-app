import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitByComma',
  standalone: true
})
export class SplitByCommaPipe implements PipeTransform {
  transform(value: string): string[] {
    if (!value) return [];
    return value.split(',').map(item => item.trim());
  }
}
