import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementsService } from 'src/app/shared/services/evenements.service';
import { EvenementI } from 'src/app/shared/models/evenement-i';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  eventId !: string;
  event !: EvenementI;

  constructor(public eventService: EvenementsService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {

    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    this.eventService.getEvent(this.eventId)
      .then((e) => {
        this.event = e;
        // on a déjà le console.log dans le service
      })
      .catch((er) => console.log(er));

  }

  eventForm: FormGroup = this.fb.group({
    titre: ['', Validators.required],
    date: ['', Validators.required],
    debut: ['', Validators.required],
    fin: ['', Validators.required],
    places: ['', Validators.required],
    image: ['']
  });

  // Fonction pour mettre à jour un évènement dans la liste
  updateEvent() {

    const event = {
      titre: this.eventForm.value.titre,
      date: this.eventForm.value.date,
      horaires: {
        debut: this.eventForm.value.debut,
        fin: this.eventForm.value.fin
      },
      places: this.eventForm.value.places,
      image: this.eventForm.value.image
    };
    
    this.eventService.updateEvent(this.eventId, event);
    this.router.navigateByUrl('organisation/events');
    this.eventForm.reset();
  }

}
