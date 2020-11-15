import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CguPageRoutingModule } from './cgu-routing.module';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { HeaderModule } from '../header/header.module';

import { CguPage } from './cgu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CguPageRoutingModule,
    TranslateModule,
    HeaderModule

  ],
  declarations: [CguPage]
})
export class CguPageModule {}
