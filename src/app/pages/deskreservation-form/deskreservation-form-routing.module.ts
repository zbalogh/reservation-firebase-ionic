import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeskreservationFormPage } from './deskreservation-form.page';

const routes: Routes = [
  {
    path: '',
    component: DeskreservationFormPage
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
export class DeskreservationFormPageRoutingModule {}
