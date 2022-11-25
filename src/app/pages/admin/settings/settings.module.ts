import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { ManageDeskreservationPageModule } from "../manage-deskreservation/manage-deskreservation.module";

@NgModule({
    declarations: [SettingsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild(),
        SettingsPageRoutingModule,
        ManageDeskreservationPageModule
    ]
})
export class SettingsPageModule {}
