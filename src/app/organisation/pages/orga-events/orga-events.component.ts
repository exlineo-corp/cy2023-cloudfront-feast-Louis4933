import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EvenementI } from 'src/app/shared/models/evenement-i';
import { EvenementsService } from 'src/app/shared/services/evenements.service';

@Component({
  selector: 'app-orga-events',
  templateUrl: './orga-events.component.html',
  styleUrls: ['./orga-events.component.css']
})
export class OrgaEventsComponent implements OnInit {
  filtre : string = '';
  listener: Subscription;
  
  // Pagination
  pageSize: number = 5; // Nombre d'événements par page
  page: number = 1; // Page actuelle
  totalPages: number =0;
  paginatedEvents: EvenementI[] = [];
  
  constructor(public events: EvenementsService, private router: Router) { 
    this.listener = this.events.eventsList$.subscribe({
      next: evs => {
        this.totalPages = Math.ceil(evs.length / this.pageSize);
        this.goToPage(1); // Afficher la première page par défaut
      },
      error: er => console.log(er)
    });
  }

  ngOnInit(): void {
    this.events.getEvents();
  }

  addEvent(){
    this.router.navigateByUrl('organisation/events/add');
  }

  deleteEvent(id : string){
    this.events.deleteEvent(id);
    this.events.getEvents();
  }

  updateEvent(id : string){
    this.router.navigateByUrl(`organisation/events/update/${id}`);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      const startIndex = (page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedEvents = this.events.eventsList$.value.slice(startIndex, endIndex);
    }
  }

}
