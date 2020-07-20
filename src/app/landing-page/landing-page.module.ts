import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { LandingPagePageRoutingModule } from './landing-page-routing.module';

import { LandingPagePage } from './landing-page.page';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LandingPagePageRoutingModule
  ],
  declarations: [LandingPagePage,SignUpComponent,LoginComponent],
  exports:[TranslatePipe]
})
export class LandingPagePageModule {}
