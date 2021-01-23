import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {FeedbackService} from '../services/feedback.service';
import { ToastController } from '@ionic/angular';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { SignUpComponent } from '../landing-page/sign-up/sign-up.component';
import { LoginComponent } from '../landing-page/login/login.component';
import { ModalController } from '@ionic/angular';


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



	public isLogged:boolean = true;



	constructor(
		public navParams: NavParams,
		public translateService : TranslateService,
		public feedbackService : FeedbackService,
		public toastController : ToastController,
		public dataSharingServiceService:DataSharingServiceService,
		public modalController:ModalController,
		
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
		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>{
				console.log("QuestionPage >> ngOnInit", uid)
				if(uid ===null){
					this.isLogged = false
				}
				else{
					this.isLogged = true;
				}
			})
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

}
