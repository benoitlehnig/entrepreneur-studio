import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExecutivePageRoutingModule } from './executive-routing.module';

import { ExecutivePage } from './executive.page';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import {UserAvatarModule} from '../../user-avatar/user-avatar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ExecutivePageRoutingModule,
    UserAvatarModule
  ],
  declarations: [ExecutivePage]
})
export class ExecutivePageModule {}
