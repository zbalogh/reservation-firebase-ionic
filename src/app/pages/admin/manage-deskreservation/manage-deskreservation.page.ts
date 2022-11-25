import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

import { DeskReservation } from 'src/app/model/reservation.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-manage-deskreservation',
  templateUrl: './manage-deskreservation.page.html',
  styleUrls: ['./manage-deskreservation.page.scss'],
})
export class ManageDeskreservationPage implements OnInit, OnDestroy {

  reservationList: DeskReservation[] = [];

  reservationLoadedSubscription?: Subscription;

  selectedItem: DeskReservation | null = null;

   // loading indicator flag
   loadingIndicator: boolean = true;

   // data loaded flag
   dataLoaded: boolean = false;

   // labels and messages
   deleteConfirmationMsg = '';
   deleteConfirmLabel = '';
   deleteCancelLabel = '';
   deleteAlertHeader = '';
  
  constructor(
    private firebaseService: FirebaseService,
    private translate: TranslateService,
    private alertController: AlertController
  ) {
    // get the translated labels/messages
    this.deleteConfirmationMsg = this.translate.instant('reservationEditorPage.deleteConfirmation');
    this.deleteAlertHeader = this.translate.instant('reservationEditorPage.deleteButton');
    this.deleteConfirmLabel = this.translate.instant('reservationEditorPage.deleteYes');
    this.deleteCancelLabel = this.translate.instant('reservationEditorPage.deleteNo');
  }

  loadData() {
    // set loading indicator
    this.loadingIndicator = true;

    // load all reservations from the firebase database
    this.reservationLoadedSubscription = this.firebaseService.getReservations()
    .subscribe(
      (data: DeskReservation[]) => {
         // clear loading indicator
         this.loadingIndicator = false;

        console.log('Reservation list retrived from firebase collection.');

        this.reservationList = data;

        // set data loaded flag
        this.dataLoaded = true;
      },
      (error) => {
        // error occurred during the firebase request
        console.error('Error occurred while requesting reservation data from firebase. | ' + error);
        
        // clear loading indicator
        this.loadingIndicator = false;

        // clear data loaded, because error occurred
        this.dataLoaded = false;
      }
    );
  }

  ngOnInit() {
      // load data if necessary
      this.loadData();
  }

  ngOnDestroy() {
    // unsubscribe from the reservation loaded observable
    if (this.reservationLoadedSubscription) {
        this.reservationLoadedSubscription.unsubscribe();
    }
  }

  getReservationDate(reservation: DeskReservation): Date
  {
    // firebase returns datetime as JS Timestamp object,
    // so we have to convert it to Angular Date object
    let ts = reservation.reservationAt as Timestamp;
    return ts.toDate();
  }

  async deleteReservation(reservation: DeskReservation)
  {
    if (!reservation) {
      // if no reservation then return
      return;
    }

    // set the selectedItem
    this.selectedItem = reservation;

    // create alert modal with two buttons
    const alert = await this.alertController.create(
    {
      //header: this.deleteAlertHeader,
      message: this.deleteConfirmationMsg,
      buttons: [
          {
              text: this.deleteCancelLabel,
              role: 'cancel',
              handler: () => {
                // decline the deletion
                this.decline();
              },
          },
          {
              text: this.deleteConfirmLabel,
              role: 'confirm',
              handler: () => {
                // deletion confirmed, execute the delete process
                this.confirm();
              },
          },
      ],
    });

    // show alert modal
    await alert.present();
  }

  confirm(): void
  {
    // in this point the selected item should not be null as well as 'id' attribute
    const rid = this.selectedItem!.id!;
    console.log('Delete reservation by ID: ' + rid);
    
    // execute firebase delete function
    this.firebaseService.deleteReservation(rid)
    .then(() => {
      // reset the selectedItem
      this.selectedItem = null;
    });
  }

  decline(): void
  {
    // reset the selectedItem
    this.selectedItem = null;
  }

}
