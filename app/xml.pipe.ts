import { Pipe, PipeTransform } from '@angular/core';

declare var vkbeautify: any;

@Pipe({name: 'xml'})
export class XmlPipe implements PipeTransform {

  transform(value: string): string {
    return vkbeautify.xml(value);
  }
}