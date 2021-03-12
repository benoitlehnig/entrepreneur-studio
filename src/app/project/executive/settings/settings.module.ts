import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { FileUploadModule } from 'ng2-file-upload';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    FileUploadModule,
    TranslateModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
