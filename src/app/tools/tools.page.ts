import { Component, OnInit } from '@angular/core';
import { CMSService} from '../services/cms.service';
import {TranslateService} from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { ModalController } from '@ionic/angular';
import { AddToolComponent } from './add-tool/add-tool.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LoginComponent } from '../landing-page/login/login.component';
import { Platform } from '@ionic/angular';


@Component({
	selector: 'app-tools',
	templateUrl: './tools.page.html',
	styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {

	public tools;
	public isLogged:boolean=false;

	public items = [];
	public filter={
		categories : [],
		stages:[],
		productName:""
	}
	public stages = [];
	public side ="bottom";



	constructor(
		public CMSService:CMSService,
		public translateService : TranslateService,
		public dataSharingServiceService : DataSharingServiceService,
		public modalController:ModalController,
		private socialSharing: SocialSharing,
		public platform: Platform


		)
	{
		
	}

	ngOnInit() {
		this.CMSService.retrieveToolsContent(this.filter).pipe(first()).subscribe(
			data=>{
				if(data !==null){
					this.tools = data.sort((n1,n2) => n1.name.localeCompare(n2.name));
				}
			});
		if(this.platform.width() <768){
			this.side ="start";
		}
		this.translateService.get('TOOLS.CATEGORIES').subscribe(
			data=>{
				let arr=[];
				Object.keys(data).map(function(key){  
					arr.push({id: key, name:data[key]})  
					return arr;  
				}); 
				arr= arr.sort((n1,n2) => n1.name.localeCompare(n2.name));
				this.items = arr;
			})
		this.translateService.get('TOOLS.STAGES').subscribe(
			data=>{
				let arr=[];
				Object.keys(data).map(function(key){  
					arr.push({id: key, name:data[key]})  
					return arr;  
				}); 
				arr= arr.sort((n1,n2) => n1.name.localeCompare(n2.name));
				this.stages = arr;
			})
		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>{
				(uid ===null)? this.isLogged = false : this.isLogged = true;
			})
	}
	updateList(){

		this.CMSService.retrieveToolsContent(this.filter).pipe(first()).subscribe(
			data=>{
				this.tools = data;
				if(data !==null){
					this.tools = data.sort((n1,n2) => n1.name.localeCompare(n2.name));
				}
			})
	}

	requestAddTool(){
		if(this.isLogged ===true){
			this.presentAddToolPopover();
		}
		else{
			this.presentLoginPopover();

		}

	}
	async presentLoginPopover() {
		const popover = await this.modalController.create({
			component: LoginComponent,
			componentProps:{homeref:this, reason:"ToolAccess"},
			cssClass: 'onboardingPopup',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissLoginPopover(){
		this.modalController.dismiss();
	}

	async presentAddToolPopover() {
		const popover = await this.modalController.create({
			component: AddToolComponent,
			componentProps:{homeref:this},
			cssClass: 'onboardingPopup',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissAddToolPopover(){
		this.modalController.dismiss();
	}
}
