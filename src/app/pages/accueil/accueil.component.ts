import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  title = 'CY2023-feast';
  soustitre: string = "L'application de gestion de vos soirées";
}
