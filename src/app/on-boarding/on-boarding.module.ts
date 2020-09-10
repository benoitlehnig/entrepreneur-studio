import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import {UserAvatarModule} from '../user-avatar/user-avatar.module';

import { OnBoardingPageRoutingModule } from './on-boarding-routing.module';

import { OnBoardingPage } from './on-boarding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnBoardingPageRoutingModule,
    TranslateModule,
    UserAvatarModule
  ],
  declarations: [OnBoardingPage]
})
export class OnBoardingPageModule {}
