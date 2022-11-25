import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DeskReservation } from 'src/app/model/reservation.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-deskreservation-form',
  templateUrl: './deskreservation-form.page.html',
  styleUrls: ['./deskreservation-form.page.scss'],
})
export class DeskreservationFormPage implements OnInit {

  // it is the desk number retrieved from the query parameters
  desknumber : string | null = '';

  // it is 'true' if this page is running in 'editor mode'
  editor = false;

  // it is set to true if the checkbox is checked
  checkboxAccept = false;

  // it is true if the form is submitted
  submitted = false;

  // message to display error/warning or any other messages for the user
  message = '';

  // to show error message when the reservation fails
  reservationfailedMsg = '';

  // it represents the model object for the form
  deskReservation: DeskReservation = {} as DeskReservation;

  /**
   * Constructor
   */
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) {
      // get the translated labels/messages
      this.translate.get('reservationPage.reservationfailed').subscribe( str => {
        this.reservationfailedMsg = str;
      });
  }

  ngOnInit() {
     // get the desk number
     this.desknumber = this.route.snapshot.queryParamMap.get('desknumber');

     // get the editor mode (optional)
     this.editor = this.route.snapshot.queryParamMap.get('editor') === 'true';
  }

  /**
   * This method handles the form submit event
   */
  onSubmit(reservationForm: NgForm)
  {
      if (!reservationForm.form.valid) {
        return;
      }

      // set desk number
      this.deskReservation.deskNumber = Number(this.desknumber);

      // set status
      this.deskReservation.status = 1;

      // set reservation date
      this.deskReservation.reservationAt = new Date();

      // generate reservation identifier
      this.deskReservation.reservationIdentifier = this.generateReservationIdentifier(10);

      // add this reservation into firebase collection
      this.firebaseService.addDeskReservation(this.deskReservation)
      .then((docref) => {
            console.log('Created new reservation successfully! [id=' + docref.id + ']');
            // set the 'submitted' flag
            this.submitted = true;
            // set the 'id' in the reservation object
            this.deskReservation.id = docref.id;
      })
      .catch (error => {
          console.log('error while saving the desk reservation: ' + error);
          this.message = this.reservationfailedMsg;
          //this.showErrorMessage(this.message);
      });
  }

  /**
   * Generate a random identifier string for the reservation.
   * The identifier contains both letter and numbers.
   */
  private generateReservationIdentifier(length: number)
  {
      // abcdefghijklmnopqrstuvwxyz
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let result = '';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  async showErrorMessage(errorMessage: string)
  {
    const alert = await this.alertController.create({
      header: 'Error',
      message: errorMessage,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
