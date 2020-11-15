import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from './services/auth.service';
import { AlertController } from '@ionic/angular';
import {ProjectService} from './services/project.service';
import {DataSharingServiceService} from './services/data-sharing-service.service';
import {ActivatedRoute} from '@angular/router';
import {MenuController} from '@ionic/angular';
import { first } from 'rxjs/operators';

import { Router,NavigationEnd   } from '@angular/router';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public isUserLogged:boolean =false;
  public user;

  public pages = [

  {
    title: 'Garage',
    url: '/entrepreneur',
    icon: 'layers'
  },
  {
    title: 'La boite a outils',
    url: '/tools',
    icon: 'construct'
  },
  ];
  public deletePopupTitle:string="";
  public deletePopupSubTitle:string="";
  public deletePopupCancelButton:string="";
  public deletePopupOKButton:string="";
  public projectRoute:boolean = false;

  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    public alertController:AlertController,
    public translateService:TranslateService,
    public projectService:ProjectService,
    public dataSharingServiceService:DataSharingServiceService,
    public activatedRoute:ActivatedRoute,
    private menuController: MenuController,
    private ccService: NgcCookieConsentService

    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translate.setDefaultLang('fr');
      this.statusBar.styleDefault();
      this.initCookiePopup();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.router.events.subscribe(data=>{
      this.projectRoute = (this.router.url.indexOf("/project/") !==-1);
      this.selectTabNavigation();
      this.initDeleteProject();
    })

    


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
  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  initDeleteProject(){
    this.translateService.get(['PROJECT.DeletePopupTitle','PROJECT.DeletePopupSubTitle', 'PROJECT.DeletePopupCancelButton', 'PROJECT.DeletePopupOKButton'])
    .pipe(first()).subscribe(
      value => {

        this.deletePopupTitle = value['PROJECT.DeletePopupTitle'];
        this.deletePopupSubTitle = value['PROJECT.DeletePopupSubTitle']
        this.deletePopupCancelButton = value['PROJECT.DeletePopupCancelButton' ];
        this.deletePopupOKButton = value['PROJECT.DeletePopupOKButton' ];
      });
  }
  selectTabNavigation(){
    const path = window.location.pathname;
    if (path !== undefined) {
      this.selectedIndex = this.pages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().split("/")[1]);
    }
  }

  async requestRemoveProject(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.deletePopupTitle,
      message: this.deletePopupSubTitle,
      buttons: [
      {
        text: this.deletePopupCancelButton,
        role: 'cancel',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: this.deletePopupOKButton,
        handler: () => {
          this.removeProject()
        }
      }
      ]
    });

    await alert.present();
  }
  removeProject(){
    this.dataSharingServiceService.getProjectChanges().pipe(first()).subscribe(
      (data)=>{
        if(data !==null){
          this.projectService.removeProject(data.id).then(
            data=>{
              this.router.navigate(['entrepreneur/']);
            })
        }
      })
  }
  toggle(){
    this.menuController.toggle();
  }

  initCookiePopup(){
    this.translateService//
    .get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
    .subscribe(data => {

      this.ccService.getConfig().content = this.ccService.getConfig().content || {} ;
      // Override default messages with the translated ones
      this.ccService.getConfig().content.header = data['cookie.header'];
      this.ccService.getConfig().content.message = data['cookie.message'];
      this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
      this.ccService.getConfig().content.allow = data['cookie.allow'];
      this.ccService.getConfig().content.deny = data['cookie.deny'];
      this.ccService.getConfig().content.link = data['cookie.link'];
      this.ccService.getConfig().content.policy = data['cookie.policy'];

      this.ccService.destroy(); // remove previous cookie bar (with default messages)
      this.ccService.init(this.ccService.getConfig()); // update config with translated messages
    });
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
  }

}
