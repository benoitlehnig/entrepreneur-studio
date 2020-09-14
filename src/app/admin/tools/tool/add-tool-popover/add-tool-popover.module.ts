import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddToolPopoverPageRoutingModule } from './add-tool-popover-routing.module';

import { AddToolPopoverPage } from './add-tool-popover.page';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddToolPopoverPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddToolPopoverPage]
})
export class AddToolPopoverPageModule {}
