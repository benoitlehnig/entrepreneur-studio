import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectPageRoutingModule } from './project-routing.module';

import { ProjectPage } from './project.page';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import {UserAvatarModule} from '../user-avatar/user-avatar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    UserAvatarModule,
    ProjectPageRoutingModule
  ],
  declarations: [ProjectPage]
})
export class ProjectPageModule {}
