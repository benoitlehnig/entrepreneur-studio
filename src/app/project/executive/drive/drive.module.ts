import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrivePageRoutingModule } from './drive-routing.module';

import { DrivePage } from './drive.page';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivePageRoutingModule,
    TranslateModule
  ],
  declarations: [DrivePage]
})
export class DrivePageModule {}
