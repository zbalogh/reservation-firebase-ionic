import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeskreservationFormPageRoutingModule } from './deskreservation-form-routing.module';

import { DeskreservationFormPage } from './deskreservation-form.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    DeskreservationFormPageRoutingModule
  ],
  declarations: [DeskreservationFormPage]
})
export class DeskreservationFormPageModule {}
