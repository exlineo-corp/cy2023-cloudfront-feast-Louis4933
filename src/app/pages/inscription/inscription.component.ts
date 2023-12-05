import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent{
  nom : string = '';
  prenom : string = '';
  id : string = '';
  email : string = '';
  statut : string = '';
  infos : string = '' ;
  mdp : string = '';
  statutValue : string | undefined;

  constructor (public auth: AuthService, public user:UsersService, public router: Router) {}

  signup() {
    if (this.auth.profil) {
      this.statutValue = this.auth.profil.statut;
    } else {
      this.statutValue = 'user';
    }
    this.auth.fireSignUp(this.email, this.mdp)
  }
}

