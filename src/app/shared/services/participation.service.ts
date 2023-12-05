import { Injectable } from '@angular/core';
import { ParticipantsI } from '../models/participants';
import { Firestore, addDoc, collection, deleteDoc, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private firestore:Firestore) { }

  // Inscription à l'évènement
  registration(participant: ParticipantsI) {
    addDoc(collection(this.firestore,'participations'), participant)
    .then(() => console.log('Votre inscription a bien été prise en compte'))
    .catch(er => console.log(er));
  }

  // Désinscription à l'évènement
  deregistration(eventId: string, uid: string): Promise<void> {
    const q = query(collection(this.firestore, 'participations'), where('event', '==', eventId), where('uid', '==', uid));
  
    return getDocs(q)
      .then(querySnapshot => {
        if (querySnapshot.size === 0) {
          console.log('Impossible de se désinscrire : Aucune participation trouvée');
          return;
        }
  
        const docToDelete = querySnapshot.docs[0];
        return deleteDoc(docToDelete.ref)
          .then(() => console.log('Participation supprimée'))
          .catch(er => {
            console.error('Erreur lors de la suppression du document', er);
            throw er;
          });
      })
      .catch(er => {
        console.error('Erreur lors de la récupération de la participation', er);
        throw er;
      });
  }
  
  // Récupération du nombre d'inscrits
  getCountParticipations(eventId: string): Promise<number> {
    const q = query(collection(this.firestore, 'participations'), where('event', '==', eventId));
  
    return getDocs(q)
      .then(querySnapshot => {
        const count = querySnapshot.size;
        console.log('Nombre de participations pour cet évènement :', count);
        return count;
      })
      .catch(er => {
        console.error('Erreur lors de la récupération du nombre de participants', er);
        throw er;
      });
  }

  // Vérification de la participation de l'user à l'évènement
  checkUserParticipation(idEvent: string, uid: string): Promise<ParticipantsI | null> {
    const q = query(collection(this.firestore, 'participations'), where('event', '==', idEvent), where('uid', '==', uid));
  
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((querySnapshot) => {
          if (querySnapshot.size === 0) {
            console.log('L\'utilisateur ne participe pas à l\'évènement');
            resolve(null);
          } else {
            const participant = querySnapshot.docs[0].data() as ParticipantsI;
            console.log('L\'utilisateur participe à l\'évènement');
            resolve(participant);
          }
        })
        .catch((er) => {
          console.error('Erreur lors de la récupération du document', er);
          reject(er);
        });
    });
  }
  

}
  
