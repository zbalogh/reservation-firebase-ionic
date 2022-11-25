import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeskreservationEditorPage } from './deskreservation-editor.page';

const routes: Routes = [
  {
    path: '',
    component: DeskreservationEditorPage
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
export class DeskreservationEditorPageRoutingModule {}
