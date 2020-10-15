import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {HeaderComponent} from './header.component';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import {UserAvatarModule} from '../user-avatar/user-avatar.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    RouterModule,
    UserAvatarModule
  ],
  exports:[HeaderComponent,TranslatePipe]
})
export class HeaderModule { }
