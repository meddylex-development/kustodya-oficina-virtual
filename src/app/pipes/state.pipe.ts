import { Pipe, PipeTransform } from '@angular/core';
import { UtilitiesService } from '../shared/api/services/utilities.service';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {
  constructor(
    private utilitiesService: UtilitiesService,
  ) {}
  transform(value: any, ...args: any[]): any {
    return true;
    // this.utilitiesService.fnHttpSetCustomWebService('/estado/' + value, 'GET', null).subscribe(resp => {
    //   // return null;
    // }, error => {
    //   return null;
    // });
  }

}
