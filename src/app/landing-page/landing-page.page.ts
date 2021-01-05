import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PartnersComponent } from './partners/partners.component';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.page.html',
	styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

	public isLogged:boolean = false;
	public unknownUser:boolean = false;

	
	constructor(
		public popoverController:PopoverController,
		public modalController:ModalController,
		public dataSharingServiceService:DataSharingServiceService,
		public activatedRoute: ActivatedRoute,
		) { }

	ngOnInit() {
		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>{
				if(uid ===null){
					this.isLogged = false
				}
				else{
					this.isLogged = true;
				}
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
