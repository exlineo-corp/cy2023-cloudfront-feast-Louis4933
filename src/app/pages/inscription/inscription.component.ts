import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit{
  email : string = '';
  mdp : string = '';
  @ViewChild('ctlf') ctlf!: NgForm;

  constructor (public auth: AuthService, public user:UsersService, public router: Router) { }

  ngOnInit() {
    if (this.auth.profil && this.auth.profil.statut == '') {
      this.auth.profil.statut = 'user';
    }

    if (this.auth.user && this.auth.profil == undefined) {
      this.auth.profil = { nom: '', prenom: '', statut: 'user', email: this.auth.user.email};
    }
  }

  // Fonction d'inscription
  signUp() {
    this.auth.fireSignUp(this.email, this.mdp)
  }

  // Envoi du profil de l'user
  submitProfile() {
    this.user.manageDoc(this.ctlf.value);
  }
}

