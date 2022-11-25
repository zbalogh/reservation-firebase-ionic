import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeskreservationEditorPageRoutingModule } from './deskreservation-editor-routing.module';

import { DeskreservationEditorPage } from './deskreservation-editor.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    DeskreservationEditorPageRoutingModule
  ],
  declarations: [DeskreservationEditorPage]
})
export class DeskreservationEditorPageModule {}
