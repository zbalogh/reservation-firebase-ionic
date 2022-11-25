import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowReservationPageRoutingModule } from './show-reservation-routing.module';

import { ShowReservationPage } from './show-reservation.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ShowReservationPageRoutingModule
  ],
  declarations: [ShowReservationPage]
})
export class ShowReservationPageModule {}
