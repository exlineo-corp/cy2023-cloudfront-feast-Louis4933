import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementI } from 'src/app/shared/models/evenement-i';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EvenementsService } from 'src/app/shared/services/evenements.service';
import { ParticipationService } from 'src/app/shared/services/participation.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  event!: EvenementI;
  loader: boolean = true;
  param!: string;
  
  isRegistered: boolean = false;
  countParticipations: number = 0;

  constructor(public activeRoute: ActivatedRoute, public events: EvenementsService, public auth: AuthService, public participation: ParticipationService) {}

  ngOnInit() {
    this.loadEventDetails();
  }

  // Chargement des détails de l'évènement
  loadEventDetails() {
    this.param = this.activeRoute.snapshot.paramMap.get('event') || '';
    console.log('Event id :', this.param);

    this.events.getEvent(this.param)
      .then((ev) => {
        this.event = ev;
        this.loader = false;
        console.log('Event id : ', this.event);
        this.getCountParticipations();
        this.checkUserParticipation();
      })
      .catch((error) => console.error(error));
  }

  // Inscription à l'évènement
  registration() {
    const participant = {
      uid: this.auth.user.uid,
      event: this.param
    };

    this.participation.registration(participant)
    this.isRegistered = true;
  }

  // Récupération du nombre d'inscrits
  getCountParticipations() {
    this.participation.getCountParticipations(this.param)
      .then((count) => {
        this.countParticipations = count;
        console.log('Number of participations : ', count);
      })
      .catch((er) => console.log(er));
  }

  // Désinscription à l'évènement
  deregistration() {
    this.participation.deregistration(this.param, this.auth.user.uid)
      .then(() => {
        this.isRegistered = false;
        this.getCountParticipations();
      })
      .catch((er) => console.log(er));
  }

  // Vérification de la participation de l'user à l'évènement
  checkUserParticipation() {
    if (this.auth.isLoggedIn) {
      this.participation.checkUserParticipation(this.param, this.auth.user.uid)
        .then((participation) => {
          if (participation) {
            this.isRegistered = true;
            console.log(participation);
          }
        })
        .catch((er) => console.log(er));
    }
  }
}
