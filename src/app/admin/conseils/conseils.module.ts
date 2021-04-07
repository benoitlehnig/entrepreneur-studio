import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConseilsPageRoutingModule } from './conseils-routing.module';

import { ConseilsPage } from './conseils.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConseilsPageRoutingModule
  ],
  declarations: [ConseilsPage]
})
export class ConseilsPageModule {}
