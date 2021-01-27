import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';	
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ConseilPageRoutingModule } from './conseil-routing.module';
import { ConseilPage } from './conseil.page';

@NgModule({
	imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	HeaderModule,
	TranslateModule,
	ConseilPageRoutingModule
	],
	declarations: [ConseilPage]
})
export class ConseilPageModule {}