import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolPageRoutingModule } from './tool-routing.module';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { ToolPage } from './tool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolPageRoutingModule,
    TranslateModule
  ],
  declarations: [ToolPage]
})
export class ToolPageModule {}
