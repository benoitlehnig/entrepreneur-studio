import { Component, OnInit,Input } from '@angular/core';
import {FeedbackService} from   '../../../../services/feedback.service';
import { NavParams} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-popover-feedback',
	templateUrl: './popover-feedback.component.html',
	styleUrls: ['./popover-feedback.component.scss'],
})
export class PopoverFeedbackComponent implements OnInit {

	public feedback = {
		type:"",
		text:""
	};

	@Input() type:string; 
	@Input("homeref") homeref;
	public successfullySent:string="";

	constructor(
		public feedbackService:FeedbackService,
		public navParams : NavParams,
		public toastController : ToastController,
		public translateService : TranslateService,

		)

	{

	}

	ngOnInit() {
		this.translateService.get('FEEDBACK.SuccessfullySent').subscribe(
			value => {
				this.successfullySent = value;
			});

	}

	sendFeedback(){
		this.feedback.type = this.type;
		this.feedbackService.sendFeedback(this.feedback);
		this.presentToast();
		this.dismiss();
	}

	dismiss(){
		this.navParams.get('homeref').dismiss();
	}

	async presentToast() {
		const toast = await this.toastController.create({
			message: this.successfullySent,
			duration: 4000,
			position:'top'
		});
		toast.present();
	}

}
