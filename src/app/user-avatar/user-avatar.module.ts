import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {UserAvatarComponent} from '../user-avatar/user-avatar.component';
import {PopoverComponent} from '../user-avatar/popover/popover.component';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';


@NgModule({
  declarations: [UserAvatarComponent,PopoverComponent],
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    RouterModule

  ],
  exports:[UserAvatarComponent,PopoverComponent,TranslatePipe]
})
export class UserAvatarModule { }
