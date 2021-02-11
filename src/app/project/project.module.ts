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
import {MenuPopoverComponent} from './menu-popover/menu-popover.component';
import { CommentsComponent } from './executive/comments/comments.component';
import { CommentPopoverComponent } from './executive/comments/comment-popover/comment-popover.component';

import { TooltipModule } from 'ng2-tooltip-directive';
import { NavParams} from '@ionic/angular';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HeaderModule,
    ProjectPageRoutingModule,
    UserAvatarModule,
    TooltipModule,


  ],
  providers:[NavParams],

  declarations: [ProjectPage,SharingStatusPopoverComponent,MenuPopoverComponent,CommentsComponent,CommentPopoverComponent]
})
export class ProjectPageModule {}
