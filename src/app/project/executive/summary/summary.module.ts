import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SummaryPageRoutingModule } from './summary-routing.module';
import { PopoverProjectSummaryComponent } from './popover-project-summary/popover-project-summary.component';
import { PopoverBusinessCanvasComponent } from './popover-business-canvas/popover-business-canvas.component';
import { BusinessCanvasElementComponent } from './business-canvas-element/business-canvas-element.component';
import { PopoverBusinessCanvasElementComponent } from './popover-business-canvas-element/popover-business-canvas-element.component';
import { FileUploadModule } from 'ng2-file-upload';

import { SummaryPage } from './summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FileUploadModule,
    SummaryPageRoutingModule
  ],
  declarations: [SummaryPage,PopoverProjectSummaryComponent,PopoverBusinessCanvasComponent,BusinessCanvasElementComponent,PopoverBusinessCanvasElementComponent]
})
export class SummaryPageModule {}
