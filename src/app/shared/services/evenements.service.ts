import { Injectable } from '@angular/core';
import { EvenementI } from '../models/evenement-i';
import { BehaviorSubject } from 'rxjs';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {

  eventsList: Array<EvenementI> = [];
  eventsList$:BehaviorSubject<Array<EvenementI>> = new BehaviorSubject([] as Array<EvenementI>);

  constructor( private firestore: Firestore) {}

  // Récupération de tous les évènements
  getEvents(){
    this.eventsList = [];

    getDocs(collection(this.firestore, 'events'))
      .then((querySnapshot) => {
        const newEventsList : EvenementI[] = [];
  
        querySnapshot.forEach((doc) => {
          const data = doc.data() as EvenementI;
          const eventData = { ...data, id: doc.id };
          newEventsList.push(eventData);
        });
  
        this.eventsList = newEventsList;
        this.eventsList$.next(this.eventsList);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Récupération d'un évènement
   * @param id
   */
  getEvent(id: string): Promise<EvenementI> {
    return getDoc(doc(this.firestore, 'events', id))
      .then((eventDoc) => {
        if (eventDoc.exists()) {
          const event = eventDoc.data() as EvenementI;
          event.id = eventDoc.id;
          console.log('Event details:', event);
          return event;
        } else {
          console.log('No such event!');
          return {} as EvenementI;
        }
      })
      .catch((error) => {
        console.error('Firestore error:', error);
        return {} as EvenementI;
      });
  }

  /**
   * Ajout d'un nouvel évènement
   * @param eventData
   */
  addEvent(eventData: any) {
    addDoc(collection(this.firestore, 'events'), eventData)
    .then(() => {
      console.log('Event added successfully');
    })
    .catch((error) => {
      console.error('Error adding event:', error);
      throw error;
    });
  }

  /**
   * Suppression d'un évènement
   * @param eventId
   */
  deleteEvent(eventId: string) {
    deleteDoc(doc(this.firestore, 'events', eventId))
    .then(() => {
      console.log('Event deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting event:', error);
      throw error;
    });
  }

  /**
   * Mise à jour d'un évènement
   * @param eventId
   * @param updatedEventData
   */
  updateEvent(eventId: string, updatedEventData: EvenementI) {
    const eventRef = doc(this.firestore, 'events', eventId);
    setDoc(eventRef, updatedEventData)
    .then(() => {
      console.log('Event updated successfully');
    })
    .catch((error) => {
      console.error('Error updating event:', error);
      throw error;
    });
  }

}
