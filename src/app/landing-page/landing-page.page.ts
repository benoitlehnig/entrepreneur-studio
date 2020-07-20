import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.page.html',
	styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

	constructor(
		public popoverController:PopoverController) { }

	ngOnInit() {
	}

	getContent() {
		return document.querySelector('ion-content');
	}

	scrollTo(elementId: string) {
		let y = document.getElementById(elementId).offsetTop;
		this.getContent().scrollToPoint(0, y,400);
	}

	async presentSignUpPopover() {
		const popover = await this.popoverController.create({
			component: SignUpComponent,
			componentProps:{homeref:this},
			cssClass: 'registerPopover',
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

}
