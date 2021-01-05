import { Component, OnInit } from '@angular/core';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import {Project} from '../../../models/project';
import {ProjectService} from '../../../services/project.service';
import { ModalController } from '@ionic/angular';
import { PopoverBusinessCanvasComponent } from './popover-business-canvas/popover-business-canvas.component';
import { PopoverSocialNetworkComponent } from './popover-social-network/popover-social-network.component';
import * as moment from 'moment';


@Component({
	selector: 'app-summary',
	templateUrl: './summary.page.html',
	styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

	public project:Project = new Project();
	public projectId:string="";

	public socialNetworks=[
	{type: "facebook"},{type: "linkedIn"},{type: "instagram"},{type: "twitter"},{type: "youtube"}]

	public updateOnGoing:boolean= false;

	public lastUpdateTime =moment();
	constructor(
		public dataSharingServiceService: DataSharingServiceService,
		public projectService:ProjectService,
		public modalController: ModalController,

		) { 
		
	}

	ionViewWillEnter(){
		console.log("SummaryPage ionViewWillEnter")

		this.initProject();

	}
	ngOnInit() {

	}

	

	initProject(){
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{
				if(data !==null){
					this.projectId	= data.id
					if(data.data !==null){
						console.log("initProject dataSharingServiceService", data);
						this.project= data.data;
						;
					}
				}
				else{
					this.project= new Project();
				}
			})		
	}

	saveProject(project){
		this.projectService.saveProject(this.projectId,project).then(
			data=>{
				this.updateOnGoing =false;
			})
		this.modalController.dismiss();
	}


	async updateProject(){
		this.projectService.saveProject(this.projectId,this.project);
		this.lastUpdateTime = moment();
	}

	delay(ms: number) {
		return new Promise( resolve => setTimeout(resolve, ms) );
	}
	elementUpdated(ev){
		console.log("elementUpdated" , ev);
		let data =JSON.parse(ev)
		console.log(data);

		this.project.businessCanvas[data.type] = data.data;
		console.log("this.project.businessCanvas.problem",this.project.businessCanvas[data.type])
		this.saveProject(this.project);
	}
	

	addSocialNetwork(type:string){

	}
	
	async requestAddPage(type:string,mode:string){
		let modal = await this.modalController.create({
			component: PopoverSocialNetworkComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:type, project:this.project, mode:mode},
		});		
		modal.onWillDismiss().then(
			data=> this.initProject()
			)
		return await modal.present();
	}

	dismiss(){
		this.modalController.dismiss();
	}


}
