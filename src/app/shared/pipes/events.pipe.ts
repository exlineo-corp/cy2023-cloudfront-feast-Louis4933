import { Pipe, PipeTransform } from '@angular/core';
import { EvenementI } from '../models/evenement-i';

@Pipe({
  name: 'events'
})
export class EventsPipe implements PipeTransform {

  transform(listEvents: Array<EvenementI>, filtre : string): Array<EvenementI> {
    return listEvents.filter(event => event.titre.toLowerCase().indexOf(filtre.toLowerCase()) > -1 );
  }

}
