export interface EvenementI {
  id ?: string;
  titre : string;
  date : number | Date;
  places : number;
  horaires : HoraireI;
  infos ?: string;
  image?: string;
}

interface HoraireI {
  debut : string;
  fin : string;
}
