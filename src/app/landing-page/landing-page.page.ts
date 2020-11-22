import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
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
		const popover = await this.popoverController.create({
			component: SignUpComponent,
			componentProps:{homeref:this},
			cssClass: 'loginPopover',
			backdropDismiss: true,
			translucent: true
		});
		return await popover.present();
	}
	dismissSignUpPopover(){
		this.popoverController.dismiss();
	}
	
	async presentLoginPopover() {
		const popover = await this.popoverController.create({
			component: LoginComponent,
			componentProps:{homeref:this},
			cssClass: 'registerPopover',
			backdropDismiss: true,
			translucent: true
		});
		return await popover.present();
	}
	dismissLoginPopover(){
		this.popoverController.dismiss();
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
