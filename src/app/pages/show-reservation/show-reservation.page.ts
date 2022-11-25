import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Subscription } from 'rxjs';

import { DeskReservation } from 'src/app/model/reservation.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-show-reservation',
  templateUrl: './show-reservation.page.html',
  styleUrls: ['./show-reservation.page.scss'],
})
export class ShowReservationPage implements OnInit, OnDestroy {

    // error flag
    errorMessage = '';

    // flag for cancellation. Set to true if cancellation is success.
    cancelled = false;
  
    // it represents the model object for the form
    deskReservation: DeskReservation | null = null; // {} as DeskReservation;
  
    // it is bind to the input field where user enter the reservation identifier
    reservationIdentifier = '';
  
    // it holds the subscription for the firebase observable retrieved from the firebase query
    reservationQuerySubscription?: Subscription;
    
    constructor(
      private translate: TranslateService,
      private firebaseService: FirebaseService
    ) {}

  ngOnInit() {
  }

  onSubmitReservationIdentifierForm(reservationIdentifierForm: NgForm)
  {
      // check if the form is valid
      if (!reservationIdentifierForm.form.valid) {
          return;
      }

      this.reservationQuerySubscription = this.firebaseService.getReservationByIdentifier(this.reservationIdentifier)
      .subscribe( (resultData) =>
        {
          if (resultData) {
            this.errorMessage = '';
            this.deskReservation = {...resultData};
          }
          else {
            console.log('No reservation found by the given identifier: ' + this.reservationIdentifier);
            // get the translated labels/messages
            this.translate.get('showReservationPage.reservationNotFound').subscribe( str => {
              this.errorMessage = str;
            });
          }
        },
        (error) => {
          console.log('Error while getting desk reservation by the given identifier: ' + this.reservationIdentifier + ' | ' + error);
          // get the translated labels/messages
          this.translate.get('showReservationPage.reservationNotFound').subscribe( str => {
            this.errorMessage = str;
          });
        }
      );
  }

  onCancelReservation()
  {
    if (this.deskReservation && this.deskReservation.reservationIdentifier && this.deskReservation.id) {
      // read the identifier
      const reservationIdentifier = this.deskReservation.reservationIdentifier;

      // unsubscribe from the reservationQuerySubscription
      // otherwise we have error message that no reservation found after the deletion
      this.unSubscribeReservationQuery();

      // now let's delete reservation
      this.firebaseService.deleteReservation(this.deskReservation.id)
      .then(() => {
          // cancellation is successfully done
          this.cancelled = true;
          this.errorMessage = '';
      })
      .catch(error => {
          console.log('Error while deleting desk reservation by the given identifier: ' + reservationIdentifier + ' | ' + error);
          this.cancelled = false;
          // get the translated labels/messages
          this.translate.get('showReservationPage.cancelReservationFailed').subscribe( str => {
              this.errorMessage = str;
          });
      });
    }
    else {
      // normally we should have reservation...
      console.log('well, no reservation found. Nothing to do.');
    }
  }

  ngOnDestroy()
  {
    // unsubscribe from the reservationQuerySubscription
    this.unSubscribeReservationQuery();
  }

  private unSubscribeReservationQuery()
  {
    if (this.reservationQuerySubscription) {
        this.reservationQuerySubscription.unsubscribe();
        console.log('Unsubscribed from reservation identifier query.');
    }
  }

}
