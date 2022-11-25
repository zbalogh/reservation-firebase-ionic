import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeskReservation } from '../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // the path for the firebase collection
  private collectionDbPth = 'reservations';

  // reference to the firebase collection
  reservationRef: AngularFirestoreCollection<DeskReservation>;

  constructor(private fdb: AngularFirestore) {
    // get the reference to the given firebase collection
    this.reservationRef = fdb.collection<DeskReservation>(this.collectionDbPth);
  }

  getReservations(): Observable<DeskReservation[]>
  {
    // get all documents from the 'reservations' collection
    // transform the DocumentChangeAction to the corresponding data object which is received in the payload
    return this.fdb.collection<DeskReservation>(this.collectionDbPth, ref => {
      // define the orderBy for search: we order the list by 'deskNumber' attribute
      return ref.orderBy('deskNumber', 'asc')
    })
    .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
              // copy id and data into return object
              return {
                // add the document data (all properties from the document)
                ...c.payload.doc.data(),
                // add document id as 'id' property
                id: c.payload.doc.id
              } as DeskReservation;
          })
        )
      );
  }

  getReservationById(docid: string)
  {
      // get the document with the given 'docid'
      return this.reservationRef.doc<DeskReservation>(docid)
      .valueChanges()
      .pipe(
        map (data => {
          return {
            // copy properties from the result data
            ...data,
            // copy the document ID (valueChanges does not provide ID)
            id: docid
          } as DeskReservation;
        })
      );
  }

  getReservationByIdentifier(reservationIdentifier: string)
  {
      // execute query in the 'reservations' collection to get documents where the filter is matching
      // however, we are only interested in one item related to the given identifier (so we use limit function)
      return this.fdb.collection<DeskReservation>(this.collectionDbPth, ref => {
          // define the filter for search
          return ref.where('reservationIdentifier', '==', reservationIdentifier).limit(1)
      })
      //.valueChanges();
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
              // copy id and data into return object
              return {
                // add the document data (all properties from the document)
                ...c.payload.doc.data(),
                // add document id as 'id' property
                id: c.payload.doc.id
              } as DeskReservation;
          })
        ),
        // get the first item from the array
        map(data => data[0])
      );
  }

  addDeskReservation(reservation: DeskReservation): Promise<DocumentReference>
  {
      // add the given reservation as a new document into the firebase collection
      //
      // create copy from the reservation object
      const data = {...reservation}  as DeskReservation;
      // remove the 'id' property, because 'id' is not part of the payload (document data)
      delete data.id;
      // add new document into the collection
      return this.reservationRef.add(data);
  }

  updateDeskReservation(id: string, reservation: DeskReservation): Promise<void>
  {
      // update the given reservation in the firebase collection
      //
      // create copy from the reservation object
      const data: Partial<DeskReservation> = {...reservation};
      // remove the 'id' property, because 'id' is not part of the payload (document data)
      delete data.id;
      return this.reservationRef.doc<DeskReservation>(id).update(data);
  }

  deleteReservation(id: string): Promise<void>
  {
      // delete the document (by the given 'id') from the firebase collection
      return this.reservationRef.doc<DeskReservation>(id).delete();
  }

}
