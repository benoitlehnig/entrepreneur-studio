import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolsPageRoutingModule } from './tools-routing.module';

import { ToolsPage } from './tools.page';

import { HeaderModule} from '../header/header.module';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddToolComponent } from './add-tool/add-tool.component';
import { SharePopoverComponent } from './share-popover/share-popover.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
	imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	HeaderModule,
	TranslateModule,
	ToolsPageRoutingModule,
	NgSelectModule,
	ShareIconsModule,
	ShareButtonsModule
	],
	declarations: [ToolsPage,AddToolComponent,SharePopoverComponent],
	exports:[TranslatePipe]
})
export class ToolsPageModule {}
