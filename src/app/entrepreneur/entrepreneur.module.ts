import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrepreneurPageRoutingModule } from './entrepreneur-routing.module';

import { EntrepreneurPage } from './entrepreneur.page';

import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import {UserAvatarModule} from '../user-avatar/user-avatar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrepreneurPageRoutingModule,
    TranslateModule,
    UserAvatarModule
  ],
  declarations: [EntrepreneurPage]
})
export class EntrepreneurPageModule {}
