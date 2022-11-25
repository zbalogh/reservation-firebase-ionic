import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundPage } from './notfound.page';

const routes: Routes = [
  {
    path: '',
    component: NotfoundPage
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
export class NotfoundPageRoutingModule {}
