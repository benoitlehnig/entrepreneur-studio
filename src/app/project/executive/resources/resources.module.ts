import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourcesPageRoutingModule } from './resources-routing.module';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { ResourcesPage } from './resources.page';
import {ResourceComponent} from './resource/resource.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResourcesPageRoutingModule,
    TranslateModule
  ],
  declarations: [ResourcesPage,ResourceComponent]
})
export class ResourcesPageModule {}
