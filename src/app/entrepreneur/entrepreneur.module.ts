import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';

import { IonicModule } from '@ionic/angular';

import { EntrepreneurPageRoutingModule } from './entrepreneur-routing.module';

import { EntrepreneurPage } from './entrepreneur.page';

import {TranslateModule,TranslatePipe} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrepreneurPageRoutingModule,
    TranslateModule,
    HeaderModule

  ],
  declarations: [EntrepreneurPage ]
})
export class EntrepreneurPageModule {}
