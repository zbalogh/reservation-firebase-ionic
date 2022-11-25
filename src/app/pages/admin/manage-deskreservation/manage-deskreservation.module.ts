import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ManageDeskreservationPage } from './manage-deskreservation.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([]),
    TranslateModule.forChild()
  ],
  declarations: [
    ManageDeskreservationPage
  ],
  exports: [
    ManageDeskreservationPage
  ]
})
export class ManageDeskreservationPageModule {}
