import { Component, OnInit,Input } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavParams} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {QuestionPage} from '../../question/question.page';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {


	constructor(
		public authService:AuthService,
		public router:Router,
		public navParams:NavParams,
		private modalController: ModalController,
		) { }

	@Input("homeref") value;
	
	
	ngOnInit() {}

	logout(){
		this.authService.logout()
	}

	navigateToProfile(){
		this.router.navigate(['/profile']);
		this.navParams.get('homeref').dismissPopover();
	}


	async displayQuestionModal(){
		const popover = await this.modalController.create({
			component: QuestionPage,
			cssClass: 'onboardingPopup',
			componentProps: {homeref:this},

		});
		this.navParams.get('homeref').dismissPopover();
		return await popover.present();
	}

	dismiss(){
		this.modalController.dismiss();
	}
}
