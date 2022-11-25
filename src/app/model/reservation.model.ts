import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

export interface DeskReservation {

    id?: string;    // 'id' is not part of the document that we store in firebase. It is the document identifier

    deskNumber: number;

    reservationAt: Date | Timestamp;  // we allwes two types: Firebase uses JS Timestamp, but we also use Angular Date type.

    status: number;

    firstname: string;

    lastname: string;

    email: string;

    telephone: string;

    reservationIdentifier: string;
}

export function compareDeskReservation(c1: DeskReservation, c2: DeskReservation) {
    const compare = c1.deskNumber - c2.deskNumber;
    if (compare > 0) {
      return 1;
    } else if ( compare < 0) {
      return -1;
    } else {
        return 0;
    }
}
