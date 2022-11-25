import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeskreservationPage } from './deskreservation.page';

const routes: Routes = [
  {
    path: '',
    component: DeskreservationPage
  }
];

@NgModule({
  imports: 
  [RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class DeskreservationPageRoutingModule {}
