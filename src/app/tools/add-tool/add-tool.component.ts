import { Component, OnInit,Input } from '@angular/core';
import { Tool} from '../../models/tool';
import { NavParams} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Router } from '@angular/router';

import {DataSharingServiceService} from '../../services/data-sharing-service.service';


@Component({
	selector: 'app-add-tool',
	templateUrl: './add-tool.component.html',
	styleUrls: ['./add-tool.component.scss'],
})
export class AddToolComponent implements OnInit {
	
	@Input("homeref") value;
	public tool:Tool=new Tool();
	public uid;
	public successfullySent:string=""
	public categories = [];
	public stages = [];
	public toolStages = [];
	public toolCategories = [];

	constructor(
		public navParams:NavParams,
		public toastController : ToastController,
		public translateService : TranslateService,
		public functions:AngularFireFunctions,
		public dataSharingServiceService : DataSharingServiceService,


		) 
	{ }


	ngOnInit() {
		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>{
				this.uid= uid;
			})

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
	selectFilter(type,filter,event){
		console.log("selectFilter",type,filter,event )
		if(type ==='stage'){
			if(event.detail.checked ===true){
				this.toolStages.push(filter.id);
			}
			else{
				this.toolStages.splice(this.toolStages.indexOf(filter.id), 1);
			}

		}
		if(type ==='category'){
			if(event.detail.checked ===true){
				this.toolCategories.push(filter.id);
			}
			else{
				this.toolCategories.splice(this.toolCategories.indexOf(filter.id), 1);

			}
		}
		this.tool.stages = this.toolStages;
		this.tool.categories = JSON.stringify(this.toolCategories);

		console.log("selectFilter",this.tool)
		
	}

	send(){
		let email ="";
		if(this.uid.email ){
			email = this.uid.email
		}
		const callable = this.functions.httpsCallable('suggestTool');
		console.log({tool:this.tool, email: email});
		const obs = callable({tool:this.tool, email: email});
		console.log("send this.tool", this.tool, email);
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
	

	ngOnDestroy(){

	}

}
