export interface UsersI {
  nom ?: string;
  prenom ?: string;
  id ?: string;
  email : string;
  emailVerified ?: boolean;
  token ?: string;
  statut ?: string;
}

export interface ContactI {
  nom : string;
  prenom : string;
  age ?: number;
  adresse : Adresse;
  tel ?: string;
  mobile : string;
  email : string;
  status ?: string;
  infos ?: string;
}

interface Adresse {
  rue : string;
  codePostal : number;
  ville : string;
}

export interface FireUserI {
  email : string;
}