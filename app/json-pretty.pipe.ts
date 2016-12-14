import { Pipe, PipeTransform } from '@angular/core';

declare var vkbeautify: any;

@Pipe({name: 'jsonpretty'})
export class JsonPrettyPipe implements PipeTransform {

  transform(value: string): string {
    return vkbeautify.json(value);
  }
}