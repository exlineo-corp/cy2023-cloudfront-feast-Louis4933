import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EvenementsService } from 'src/app/shared/services/evenements.service';

@Component({
  selector: 'app-orga-events',
  templateUrl: './orga-events.component.html',
  styleUrls: ['./orga-events.component.css']
})
export class OrgaEventsComponent implements OnInit {
  filtre : string = '';

  constructor(public eventService: EvenementsService, private router: Router) { }

  ngOnInit(): void {
    this.eventService.getEvents();
  }

  addEvent(){
    this.router.navigateByUrl('organisation/events/add');
  }

  deleteEvent(id : string){
    this.eventService.deleteEvent(id);
    this.eventService.getEvents();
  }

  updateEvent(id : string){
    this.router.navigateByUrl(`organisation/events/update/${id}`);
  }

}
