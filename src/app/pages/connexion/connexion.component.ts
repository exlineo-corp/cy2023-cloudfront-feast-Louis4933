import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  id : string = '';
  mdp : string = '';

  constructor (public  auth : AuthService, public router:Router) {}

  login() {
    this.auth.fireSignIn()
      .then(() => {
        // Redirige l'utilisateur vers la page d'accueil après une connexion réussie
        if (this.auth.isLoggedIn) {
          this.router.navigateByUrl('/');
        }
      })
      .catch((error: any) => {
        console.error('Erreur de connexion', error);
      });
  }

}
