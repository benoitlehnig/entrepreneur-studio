import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from './services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public isUserLogged:boolean =false;
  public user;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private _router: Router

    ) {
     this._router.events.subscribe(evt=>{console.log(evt)})
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translate.setDefaultLang('fr');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

    this.afAuth.user.subscribe(
      data =>{
        console.log("user >>", data);

        if(data){
          this.user = data;
          console.log("lastSignInTime : ", data.metadata.lastSignInTime)
          this.isUserLogged =true;
        }
        else{
           this.isUserLogged = false;
        }
      });

  }

}
