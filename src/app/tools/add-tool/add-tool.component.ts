import { Component, OnInit,Input } from '@angular/core';
import { Tool} from '../../models/tool';
import { NavParams} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Router } from '@angular/router';








@Component({
	selector: 'app-add-tool',
	templateUrl: './add-tool.component.html',
	styleUrls: ['./add-tool.component.scss'],
})
export class AddToolComponent implements OnInit {
	
	@Input("homeref") value;
	public tool:Tool=new Tool();
	public successfullySent:string=""
	public categories = [];
	public stages = []

	constructor(
		public navParams:NavParams,
		public toastController : ToastController,
		public translateService : TranslateService,
		public functions:AngularFireFunctions,

		) 
	{ }


	ngOnInit() {
		this.translateService.get('ADDTOOL.SuccessfullySent').subscribe(
			value => {
				this.successfullySent = value;
			});
		this.translateService.get('TOOLS.CATEGORIES').subscribe(
			data=>{
				let arr=[];
				Object.keys(data).map(function(key){  
					arr.push({id: key, name:data[key]})  
					return arr;  
				}); 
				this.categories = arr;
			})
		this.translateService.get('TOOLS.STAGES').subscribe(
			data=>{
				console.log("STAGES" , data);
				let arr=[];
				Object.keys(data).map(function(key){  
					arr.push({id: key, name:data[key]})  
					return arr;  
				}); 
				this.stages = arr;
				console.log(this.stages)
			})
	}
	send(){
		const callable = this.functions.httpsCallable('suggestTool');
		const obs = callable(this.tool);
		console.log("send this.tool", this.tool);
		obs.subscribe(res => {
			console.log("suggestTool done", res);
			this.dismiss();
			this.presentToast();
		});
	}

	dismiss(){
		this.navParams.get('homeref').dismissAddToolPopover();

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
