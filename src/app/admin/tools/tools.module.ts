import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolsPageRoutingModule } from './tools-routing.module';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { ToolPageModule } from '../../tools/tool/tool.module';

import { ToolsPage } from './tools.page';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolsPageRoutingModule,
    TranslateModule,
    ToolPageModule,
    NgSelectModule
  ],
  declarations: [ToolsPage ]
})
export class ToolsPageModule {}
