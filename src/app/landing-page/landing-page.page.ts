import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PartnersComponent } from './partners/partners.component';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { ActivatedRoute } from '@angular/router';
import {CMSService} from '../services/cms.service';
import {Statistics} from '../models/Statistics';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';



@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.page.html',
	styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

	public isLogged:boolean = false;
	public unknownUser:boolean = false;
	public systemDParamSub: Subscription = new Subscription();
	public statisticsSub: Subscription = new Subscription();
	public systemDSlackChannel:string="";
	public statistics: Statistics= new Statistics();
	public isTestSystem:boolean = false;


	
	constructor(
		public popoverController:PopoverController,
		public modalController:ModalController,
		public dataSharingServiceService:DataSharingServiceService,
		public activatedRoute: ActivatedRoute,
		public CMSService:CMSService,
		private functions: AngularFireFunctions,


		) { }

	ngOnInit() {
		if(window.location.origin.indexOf("localhost") !==-1 || window.location.origin.indexOf("entrepreneur-studio-test")!==-1 ){
			this.isTestSystem = true;
		}
		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>{
				if(uid ===null || uid===-1){
					this.isLogged = false
				}
				else{
					this.isLogged = true;
				}
			})
		this.systemDParamSub = this.CMSService.getSystemDParams().pipe(first()).subscribe(
			(systemDparams:any)=>{
				this.systemDSlackChannel = systemDparams.systemDChannel;
			}) 

		this.statisticsSub = this.CMSService.getStatistics().pipe(first()).subscribe(
			(systemDparams:any)=>{
				this.statistics = systemDparams;
			}) 
		this.activatedRoute.params.subscribe(params => {
			console.log("params",params)
			if(params['unknownUser'] === 'true'){
				console.log("params2",params)
				this.unknownUser = true;
				this.popoverController.dismiss();
				this.presentSignUpPopover();
			}
		});

		/*const callable = this.functions.httpsCallable('retrievePosts');
		let obs = callable({});


		obs.subscribe(async res => {
			console.log("wordpress,", res)
		});*/


	}
	ngOnDestroy(){
		this.systemDParamSub.unsubscribe();
		this.statisticsSub.unsubscribe();

	}

	getContent() {
		return document.querySelector('ion-content');
	}

	scrollTo(elementId: string) {
		let y = document.getElementById(elementId).offsetTop;
		console.log(y)
		this.getContent().scrollToPoint(0, y,300);
	}

	async presentSignUpPopover() {
		const popover = await this.modalController.create({
			component: SignUpComponent,
			showBackdrop:true,
			cssClass: 'popover',
			componentProps:{homeref:this, unknownUser:this.unknownUser},
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissSignUpPopover(){
		this.modalController.dismiss();
	}
	
	async presentLoginPopover() {
		const popover = await this.modalController.create({
			component: LoginComponent,
			componentProps:{homeref:this},
			cssClass: 'onboardingPopup',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissLoginPopover(){
		this.modalController.dismiss();
	}

	async presentPartnersPopover() {
		const popover = await this.modalController.create({
			component: PartnersComponent,
			componentProps:{homeref:this},
			cssClass: 'popover',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissParnersPopover(){
		this.modalController.dismiss();
	}



}
