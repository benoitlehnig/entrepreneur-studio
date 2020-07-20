import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncubatorPageRoutingModule } from './incubator-routing.module';

import { IncubatorPage } from './incubator.page';

import {UserAvatarModule} from '../user-avatar/user-avatar.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncubatorPageRoutingModule,
    UserAvatarModule
  ],
  declarations: [IncubatorPage]
})
export class IncubatorPageModule {}
