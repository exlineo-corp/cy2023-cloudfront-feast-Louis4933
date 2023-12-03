import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementI } from 'src/app/shared/models/evenement-i';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EvenementsService } from 'src/app/shared/services/evenements.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent {
  event !: EvenementI;
  param !: string;
  loader : boolean = true;

  constructor(public activeRoute : ActivatedRoute, public events : EvenementsService, public auth : AuthService) {
    this.loadEventDetails();
  }

  // Chargement des détails de l'évènement
  loadEventDetails() {
    this.param = this.activeRoute.snapshot.paramMap.get('event') || '';
    console.log('Event id:', this.param);
  
    this.events.getEvent(this.param)
      .then((ev) => {
        this.event = ev;
        this.loader = false;
      })
      .catch((error) => console.error(error));
  }
}
