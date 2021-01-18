import { Component, OnInit } from '@angular/core';
import { CMSService} from '../services/cms.service';
import {TranslateService} from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { ModalController } from '@ionic/angular';
import { AddToolComponent } from './add-tool/add-tool.component';
import { LoginComponent } from '../landing-page/login/login.component';
import { Platform } from '@ionic/angular';
import { AngularFireAnalytics } from '@angular/fire/analytics';


@Component({
	selector: 'app-tools',
	templateUrl: './tools.page.html',
	styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {

	public tools;
	public numberofTools:number=83;
	public isLogged:boolean=false;

	public items = [];
	public filter={
		categories : [],
		stages:[],
		productName:""
	}
	public stages = [];
	public side ="bottom";
	public loadingOngoing:boolean=false;
	public stageExpanded:boolean=false;
	public categoryExpanded:boolean=false;



	constructor(
		public CMSService:CMSService,
		public translateService : TranslateService,
		public dataSharingServiceService : DataSharingServiceService,
		public modalController:ModalController,
		public platform: Platform,
		public angularFireAnalytics:AngularFireAnalytics
		)
	{
		console.log("ToolsPage >> constructor");
	}

	ngOnInit() {
		console.log("ToolsPage >> ngOnInit");
		this.getTools();
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

		this.CMSService.getToolsNumber().pipe(first()).subscribe( (data:any)=>{
			this.numberofTools = data.number;
		})
	}
	

	requestAddTool(){
		(this.isLogged ===true)? this.presentAddToolPopover() : this.presentLoginPopover();

	}
	getTools(){
		this.angularFireAnalytics.logEvent('tool_searched',  {search_term:this.filter.productName,
		 search_categories: JSON.stringify(this.filter.categories), search_stages: JSON.stringify(this.filter.stages)});

		this.loadingOngoing = true;
		this.CMSService.retrieveToolsContent(this.filter).pipe(first()).subscribe(
			data=>{
				if(data !==null){
					this.tools = data.sort((n1,n2) => n1.name.localeCompare(n2.name));
					this.loadingOngoing = false;
				}
			});

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
		this.angularFireAnalytics.logEvent('page_view', {page_path: '/tools',  page_title: 'add_tool'});
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


	expandStage(){
		this.stageExpanded = !this.stageExpanded;

	}
	expandCategory(){
		this.categoryExpanded = !this.categoryExpanded;
	}

	selectFilter(type,filter,event){
		console.log("selectFilter",type,filter,event )
		if(type ==='stage'){
			if(event.detail.checked ===true){
				this.filter.stages.push(filter.id);
			}
			else{
				this.filter.stages.splice(this.filter.stages.indexOf(filter.id), 1);
			}

		}
		if(type ==='category'){
			if(event.detail.checked ===true){
					this.filter.categories.push(filter.id);
			}
			else{
				this.filter.categories.splice(this.filter.categories.indexOf(filter.id), 1);

			}
		}
		console.log("this.filter", this.filter)
		this.getTools();
	}
	clickTool(tool){
		this.angularFireAnalytics.logEvent('tool_clicked',  {name: tool.name});

	}
}
