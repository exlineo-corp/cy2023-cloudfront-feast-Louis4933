import { Component } from '@angular/core';
import { ContactI } from 'src/app/shared/models/users-i';
import { Firestore, addDoc, collection } from '@angular/fire/firestore'; // Assurez-vous d'avoir importé le module AngularFirestore

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact: ContactI = {
    nom: '',
    prenom: '',
    age: 0,
    adresse: {
      rue: '',
      codePostal: 0,
      ville: ''
    },
    tel: '',
    mobile: '',
    email: '',
    infos: ''
  };

  constructor(private firestore: Firestore) {}

  saveMessage() {
    addDoc(collection(this.firestore, 'contacts'), this.contact)
    .then((doc) => {
        console.log('Message enregistré avec l\'ID :', doc.id);
    })
    .catch((error) => {
        console.error('Erreur lors de l\'enregistrement du message :', error);
    });
  }
}
