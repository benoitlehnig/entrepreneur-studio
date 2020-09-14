import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import {UserAvatarModule} from '../user-avatar/user-avatar.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    UserAvatarModule,
    TranslateModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
