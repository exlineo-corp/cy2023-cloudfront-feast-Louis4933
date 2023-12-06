import { Component } from '@angular/core';
import { ContactI } from 'src/app/shared/models/users-i';
import { Firestore, addDoc, collection } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact: ContactI = {
    nom: '',
    prenom: '',
    age: 1,
    adresse: {
      rue: '',
      codePostal: 1,
      ville: ''
    },
    tel: '',
    email: '',
    infos: ''
  };

  formSubmittedSuccessfully: boolean = false;

  constructor(private firestore: Firestore) {}

  saveMessage() {
    addDoc(collection(this.firestore, 'contacts'), this.contact)
    .then((doc) => {
        console.log('Message enregistré avec l\'ID :', doc.id);
        this.formSubmittedSuccessfully = true;
    })
    .catch((error) => {
        console.error('Erreur lors de l\'enregistrement du message :', error);
    });
  }
}
