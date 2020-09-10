import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {UserAvatarModule} from '../user-avatar/user-avatar.module';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    TranslateModule,
    UserAvatarModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
