// first-two-words.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstTwoWords' })
export class FirstTwoWordsPipe implements PipeTransform {
  transform(value: string): string {
    const words = value.split(' ');
    if (words.length >= 2) {
      return words.slice(0, 2).join(' ');
    }
    return value;
  }
}
