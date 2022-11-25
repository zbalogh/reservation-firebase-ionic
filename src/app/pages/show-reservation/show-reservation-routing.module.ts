import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowReservationPage } from './show-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: ShowReservationPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class ShowReservationPageRoutingModule {}
