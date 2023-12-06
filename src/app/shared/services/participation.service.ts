import { Injectable } from '@angular/core';
import { ParticipantsI } from '../models/participants';
import { DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private firestore:Firestore) { }

  // Inscription à l'évènement
  registration(participant: ParticipantsI) {
    addDoc(collection(this.firestore,'participations'), participant)
    .then(() => console.log('L\'inscription a bien été prise en compte'))
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
    const participationsQuery = query(collection(this.firestore, 'participations'), where('event', '==', eventId));

    return getDocs(participationsQuery)
      .then(querySnapshot => {
        let count = 0;

        const promises = querySnapshot.docs.map(docSnap => {
          const participationData = docSnap.data() as DocumentData;

          // Vérifier si l'utilisateur associé à l'UID existe encore
          const userDocRef = doc(this.firestore, 'users', participationData['uid']);
          return getDoc(userDocRef);
        });

        return Promise.all(promises)
          .then(userSnapshots => {
            userSnapshots.forEach(userDocSnap => {
              if (userDocSnap.exists()) {
                // L'utilisateur existe, donc compter cette participation
                count++;
              }
            });

            console.log('Nombre de participations pour cet évènement (utilisateurs existants) :', count);
            return count;
          });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nombre de participants', error);
        throw error;
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
  
