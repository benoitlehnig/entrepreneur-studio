import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PartnersComponent } from './partners/partners.component';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { AngularFireAnalytics  } from '@angular/fire/analytics';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.page.html',
	styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

	public isLogged:boolean = false;

	
	constructor(
		public popoverController:PopoverController,
		public modalController:ModalController,
		public dataSharingServiceService:DataSharingServiceService,
		public angularFireAnalytics: AngularFireAnalytics,


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
		this.angularFireAnalytics.logEvent("toto");
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
			componentProps:{homeref:this},
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
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissLoginPopover(){
		this.modalController.dismiss();
	}

	async presentPartnersPopover() {
		const popover = await this.popoverController.create({
			component: PartnersComponent,
			componentProps:{homeref:this},
			cssClass: 'registerPopover',
			backdropDismiss: true,
			translucent: true
		});
		return await popover.present();
	}
	dismissParnersPopover(){
		this.popoverController.dismiss();
	}



}
