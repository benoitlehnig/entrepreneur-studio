import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderModule} from '../header/header.module';

import { IonicModule } from '@ionic/angular';

import { ProjectPageRoutingModule } from './project-routing.module';

import { ProjectPage } from './project.page';

import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import {UserAvatarModule} from '../user-avatar/user-avatar.module';
import {SharingStatusPopoverComponent} from './sharing-status-popover/sharing-status-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HeaderModule,
    ProjectPageRoutingModule,
    UserAvatarModule

  ],
  declarations: [ProjectPage,SharingStatusPopoverComponent]
})
export class ProjectPageModule {}
