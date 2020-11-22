import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {TranslateModule,TranslateLoader,TranslatePipe} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAnalyticsModule,ScreenTrackingService,UserTrackingService  } from '@angular/fire/analytics';

import { TooltipModule } from 'ng2-tooltip-directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

import { FileUploadModule } from 'ng2-file-upload';


const cookieConfig:NgcCookieConsentConfig = {
  autoOpen:false,
  cookie: {
    domain: environment.cookieDomain
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  "content": {
    "href": "https://entrepreneur-studio.web.app/cgu",
  },
  theme: 'edgeless',
  type: 'opt-out'
};

registerLocaleData(localeFr);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  BrowserModule,
  TooltipModule,
  IonicModule.forRoot(),
  HttpClientModule,
  AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireMessagingModule,
  AngularFireAnalyticsModule,
  NgSelectModule, 
  AutoCompleteModule,
  FormsModule,
  FileUploadModule,
  NgcCookieConsentModule.forRoot(cookieConfig),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
  ],
  providers: [
  StatusBar,
  SplashScreen,
  ScreenTrackingService,
  UserTrackingService,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: LOCALE_ID, useValue: "fr-FR" },
  TranslatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
