import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimelinePageRoutingModule } from './timeline-routing.module';

import { TimelinePage } from './timeline.page';
import { AngularXTimelineModule } from 'angularx-timeline';
import { TimeElementComponent } from './time-element/time-element.component';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import { TimelinePopoverComponent } from './timeline-popover/timeline-popover.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularXTimelineModule,
    TimelinePageRoutingModule,
    TranslateModule
  ],
  exports:[TranslatePipe],
  declarations: [TimelinePage,TimeElementComponent,TimelinePopoverComponent]
})
export class TimelinePageModule {}
