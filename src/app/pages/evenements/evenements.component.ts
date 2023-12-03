import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvenementsService } from 'src/app/shared/services/evenements.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css']
})

export class EvenementsComponent implements OnInit, OnDestroy {

  filtre : string = '';
  listener: Subscription;

  constructor(public events : EvenementsService) {
    this.listener = this.events.eventsList$.subscribe(
      {
        next:evs => console.log('From observable subscription', evs),
        error:er => console.log(er),
        complete:() => console.log('Data synchro')
      }
    )
  }

  ngOnInit(): void {
    this.events.getEvents();
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }
}
