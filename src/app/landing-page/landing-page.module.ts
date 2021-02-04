import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { LandingPagePageRoutingModule } from './landing-page-routing.module';

import { LandingPagePage } from './landing-page.page';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PartnersComponent } from './partners/partners.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HeaderModule } from '../header/header.module';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LandingPagePageRoutingModule,
    HeaderModule,
    AnimateOnScrollModule.forRoot()
  ],
  declarations: [LandingPagePage,SignUpComponent,LoginComponent,PartnersComponent,TimelineComponent],
  exports:[TranslatePipe]
})
export class LandingPagePageModule {}
