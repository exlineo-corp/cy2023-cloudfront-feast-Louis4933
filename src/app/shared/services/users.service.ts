import { Injectable } from '@angular/core';
import { Firestore, setDoc, collection, doc, getDocs, deleteDoc, getDoc } from '@angular/fire/firestore'
import { AuthService } from './auth.service';
import { UsersI } from '../models/users-i';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList: Array<UsersI> = [];
  submitMessage = '';

  constructor(private firestore: Firestore, private auth: AuthService, private router: Router) { }

  /**
   * Met à jour ou créer un document dans la collection users s'il n'existe pas déjà
   * @param profil
   */
  manageDoc(profil: NgForm) {
    console.log("Profil sent: ", profil);
    const monDoc = doc(this.firestore, 'users', this.auth.user.uid);

    setDoc(monDoc, profil, { merge: true })
      .then(
        () => {
          console.log('Document created or updated');
          this.submitMessage = 'Votre profil a bien été mis à jour.';
          // Réinitialisation après l'affichage du message
          setTimeout(() => {
            this.submitMessage = '';
          }, 5000); // Réinitialise après 5 secondes
        }
      ).catch(
        er => console.log(er)
      );
  }

  // Renvoie la liste des utilisateurs déjà inscrits
  getUsers() {
    this.usersList = [];
    getDocs(collection(this.firestore, 'users'))
      .then(us => {
        us.forEach(u => {
          const userData = u.data() as UsersI;
          userData.id = u.id; // Include the document ID in the object
          this.usersList.push(userData);
        });
      })
      .catch(error => {
        console.error('Error getting users:', error);
      });
  }

  /**
   * Renvoie un user en fonction de son id
   * @param id
   */
  getUser(id: string): Promise<UsersI> {
    return getDoc(doc(this.firestore, 'users', id))
      .then((userDoc) => {
        if (userDoc.exists()) {
          const user = userDoc.data() as UsersI;
          user.id = userDoc.id;
          console.log('user details:', user);
          return user;
        } else {
          console.log('No such user!');
          return {} as UsersI;
        }
      })
      .catch((error) => {
        console.error('Firestore error:', error);
        return {} as UsersI;
      });
  }

  /**
   * Supprime le compte utilisateur
   * @param userId ID de l'utilisateur à supprimer
   */
  deleteProfile(userId: string): Promise<void> {
    const userDoc = doc(this.firestore, 'users', userId);

    return deleteDoc(userDoc)
      .then(() => {
        console.log('User account has been deleted');
      })
      .catch((error) => {
        console.error('Error deleting user account:', error);
      });
  }

  /**
   * Supprime un user (son compte en base de données & son compte firebase)
   * @param id
   */
  deleteUser(userId: string) {
    if (this.auth.profil) {
      this.deleteProfile(userId)
        .then(() => {
          console.log('Profile has been deleted');
          this.auth.deleteUser();
        }
        )
    }
    this.auth.deleteUser();
  }

  /**
   * Met à jour le statut d'un utilisateur
   * @param userId ID de l'utilisateur à mettre à jour
   * @param newStatut Nouveau statut
   */
  updateStatut(userId: string, newStatut: string): Promise<void> {
    const userDoc = doc(this.firestore, 'users', userId);
    return setDoc(userDoc, { statut: newStatut }, { merge: true });
  }

}
