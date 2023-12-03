import { Injectable, inject } from '@angular/core';
import { UsersI } from '../models/users-i';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authID : { id: string, mdp: string } = { id : '', mdp : '' };
  isLoggedIn : boolean = false;
  fire = inject(Auth); // Intégration de l'authentification de firebase
  profil !: UsersI;
  user !: User;
  errorMessage: string = '';

  constructor(private firestore: Firestore) { }

  // Fonction pour se connecter avec Firebase
  fireSignIn() {
    return signInWithEmailAndPassword(this.fire, this.authID.id, this.authID.mdp)
    //renvoie une promesse
      .then(infos => {
        this.user = infos.user;
        console.log(this.user);
        this.isLoggedIn = true;
        this.getProfile();
        this.errorMessage = ''; // Réinitialise le message d'erreur en cas de connexion réussie
      })
      .catch(error => {
        console.error('Erreur d\'authentification', error);
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.'; // Définit le message d'erreur
        throw error; // Permet de propager l'erreur à l'appelant
      });
  }

  // Fonction pour récupérer le profil de l'utilisateur
  getProfile() {
    if (this.isLoggedIn && this.user) {
      getDoc(doc(collection(this.firestore, 'users'), this.user.uid)).then(
        (doc) => {
          if (doc.exists()) {
            this.profil = doc.data() as UsersI;
            console.log(this.profil);
          }
        }
      ).catch(
        (er) => console.log(er)
      );
    }
  }

  /**
   * Fonction pour s'inscrire avec Firebase
   * @param email 
   * @param password 
   * @returns 
   */
  fireSignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.fire, email, password)
    .then((infos) => {
        this.user = infos.user;
        console.log(this.user);
        this.isLoggedIn = true;
        this.profil = { nom : '', prenom : '', email : email, statut : 'user' };
        this.errorMessage = ''; // Réinitialise le message d'erreur en cas d'inscription réussie
      })
      .catch((error) => {
        console.error('Erreur lors de l\'inscription:', error);
        this.errorMessage = 'L\'inscription a échoué. Veuillez réessayer.'; // Définit le message d'erreur
        throw error;
      });
  }

  // Fonction pour se déconnecter
  async logout() {
    try {
      // Déconnexion de l'utilisateur
      await signOut(this.fire);
      this.isLoggedIn = false;
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  }

}
