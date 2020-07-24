import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExecutivePageRoutingModule } from './executive-routing.module';

import { ExecutivePage } from './executive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExecutivePageRoutingModule
  ],
  declarations: [ExecutivePage]
})
export class ExecutivePageModule {}
