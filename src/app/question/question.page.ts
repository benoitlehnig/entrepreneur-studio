import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {FeedbackService} from '../services/feedback.service';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-question',
	templateUrl: './question.page.html',
	styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
	@Input("homeref") value;

	public feedback= {
		type:"1",
		text:""
	}
	public typeItems =[];
	public successfullySent :string ="";

	constructor(
		public navParams: NavParams,
		public translateService : TranslateService,
		public feedbackService : FeedbackService,
		public toastController : ToastController,

		) { }


	ngOnInit() {
		this.translateService.get('FEEDBACK.Types').subscribe(
			value => {
				if(value){
					this.typeItems = this.returnArrary(value);
				}
			})
		this.translateService.get('FEEDBACK.SuccessfullySent').subscribe(
			value => {
				this.successfullySent = value;
			});
	}

	dismiss(){
		this.navParams.get('homeref').dismiss()
	}
	returnArrary(input){
		let arr=[];
		Object.keys(input).map(function(key){  
			arr.push({index: key, text:input[key]})  
			return arr;  
		});
		console.log("array", arr, input)
		return arr 
	}

	send(){
		this.feedbackService.sendFeedback(this.feedback).then(
			data=>{
				this.presentToast();
				this.dismiss();
			})

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
