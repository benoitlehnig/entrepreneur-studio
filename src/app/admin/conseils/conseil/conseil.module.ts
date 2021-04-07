import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConseilPageRoutingModule } from './conseil-routing.module';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { ConseilPage } from './conseil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ConseilPageRoutingModule
  ],
  declarations: [ConseilPage]
})
export class ConseilPageModule {}
