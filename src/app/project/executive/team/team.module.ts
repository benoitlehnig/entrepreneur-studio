import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamPageRoutingModule } from './team-routing.module';

import { TeamPage } from './team.page';
import {SendInvitationComponent} from './send-invitation/send-invitation.component';
import {FindSkillsPopoverComponent} from './find-skills-popover/find-skills-popover.component';
import {SkillSearchesPopoverComponent} from './skill-searches-popover/skill-searches-popover.component';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import { TooltipModule } from 'ng2-tooltip-directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamPageRoutingModule,
    TranslateModule,
    TooltipModule
  ],
  declarations: [TeamPage,SendInvitationComponent,FindSkillsPopoverComponent,SkillSearchesPopoverComponent]
})
export class TeamPageModule {}
