import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolsPageRoutingModule } from './tools-routing.module';

import { ToolsPage } from './tools.page';

import { HeaderModule} from '../header/header.module';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
	imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	TranslateModule,
	ToolsPageRoutingModule,
	NgSelectModule,
	HeaderModule
	],
	declarations: [ToolsPage],
	exports:[TranslatePipe]
})
export class ToolsPageModule {}
