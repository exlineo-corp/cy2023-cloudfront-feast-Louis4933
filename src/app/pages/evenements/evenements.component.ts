import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvenementI } from 'src/app/shared/models/evenement-i';
import { EvenementsService } from 'src/app/shared/services/evenements.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css']
})

export class EvenementsComponent implements OnInit, OnDestroy {

  filtre: string = '';
  listener: Subscription;

  // Pagination
  pageSize: number = 5; // Nombre d'événements par page
  page: number = 1; // Page actuelle
  totalPages: number = 0;
  paginatedEvents: EvenementI[] = [];

  constructor(public events: EvenementsService) {
    this.listener = this.events.eventsList$.subscribe({
      next: evs => {
        console.log('From observable subscription', evs);
        this.totalPages = Math.ceil(evs.length / this.pageSize);
        this.goToPage(1); // Afficher la première page par défaut
      },
      error: er => console.log(er),
      complete: () => console.log('Data synchro')
    });
  }

  ngOnInit(): void {
    this.events.getEvents();
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }

  // Pagination
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      const startIndex = (page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedEvents = this.events.eventsList$.value.slice(startIndex, endIndex);
    }
  }
}
