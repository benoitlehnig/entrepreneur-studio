import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferencingPageRoutingModule } from './referencing-routing.module';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { ReferencingPage } from './referencing.page';
import {UserAvatarModule} from '../../user-avatar/user-avatar.module';

import { HeaderModule} from '../../header/header.module';

@NgModule({
	imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	TranslateModule,
	UserAvatarModule,
	HeaderModule,
	ReferencingPageRoutingModule
	],
	declarations: [ReferencingPage]
})
export class ReferencingPageModule {}
