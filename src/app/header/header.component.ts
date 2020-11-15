import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SignUpComponent } from '../landing-page/sign-up/sign-up.component';
import { LoginComponent } from '../landing-page/login/login.component';
import { PartnersComponent } from '../landing-page/partners/partners.component';
import {DataSharingServiceService} from '../services/data-sharing-service.service';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

	constructor(
		public popoverController:PopoverController,
		public dataSharingServiceService:DataSharingServiceService,
		) { }

	public isLogged:boolean = true;
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
