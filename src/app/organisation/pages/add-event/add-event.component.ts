import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EvenementsService } from 'src/app/shared/services/evenements.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  constructor(public eventService: EvenementsService, private router: Router, private fb: FormBuilder) {}

  eventForm: FormGroup = this.fb.group({
    titre: ['', Validators.required],
    date: ['', Validators.required],
    debut: ['', Validators.required],
    fin: ['', Validators.required],
    places: ['', Validators.required],
    image_url: ['']
  });


  // Fonction pour ajouter un évènement à la liste
  addEvent() {
    if (this.eventForm.valid) {
      const event = {
        titre: this.eventForm.value.titre,
        date: this.eventForm.value.date,
        horaires: {
          debut: this.eventForm.value.debut,
          fin: this.eventForm.value.fin
        },
        places: this.eventForm.value.places,
        image_url: this.eventForm.value.image_url
      };
      this.eventService.addEvent(event);
      this.router.navigateByUrl('organisation/events');
      this.eventForm.reset();
    }
  }
  
}
