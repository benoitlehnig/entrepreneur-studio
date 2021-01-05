import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from '../landing-page/sign-up/sign-up.component';
import { SolutionMenuComponent } from './solution-menu/solution-menu.component';
import { LoginComponent } from '../landing-page/login/login.component';
import { PartnersComponent } from '../landing-page/partners/partners.component';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { Router } from '@angular/router';
import {QuestionPage} from '../question/question.page'



@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

	constructor(
		public popoverController:PopoverController,
		public dataSharingServiceService:DataSharingServiceService,
		public modalController:ModalController,
		public router:Router,

		) { }

	public isLogged:boolean = true;
	ngOnInit() {
		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>{
				console.log("HeaderComponent >> ngOnInit", uid)
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
		this.router.navigate(['/landing-page']); 
		this.getContent().scrollToPoint(0, y,300);
	}

	async openSolutionMenu(ev: any){
		const popover = await this.popoverController.create({
			component: SolutionMenuComponent,
			componentProps:{homeref:this, isLogged:this.isLogged},
			event:ev,
			showBackdrop:false,
			translucent: true

		});
		return await popover.present();
	}


	async presentSignUpPopover() {
		const popover = await this.modalController.create({
			component: SignUpComponent,
			componentProps:{homeref:this},
			cssClass: 'popover',

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
			cssClass: 'popover',

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
			cssClass: 'registerPopover',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissParnersPopover(){
		this.modalController.dismiss();
	}
	dismissSolutionMenuPoverer(){
		this.popoverController.dismiss();

	}
	async displayQuestionModal(){
		const popover = await this.modalController.create({
			component: QuestionPage,
			cssClass: 'popover',
			componentProps: {homeref:this},

		});
		return await popover.present();
	}

	dismiss(){
		this.modalController.dismiss();
	}
}
