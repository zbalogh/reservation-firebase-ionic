import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeskreservationPageRoutingModule } from './deskreservation-routing.module';

import { DeskreservationPage } from './deskreservation.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    DeskreservationPageRoutingModule
  ],
  declarations: [DeskreservationPage]
})
export class DeskreservationPageModule {}
