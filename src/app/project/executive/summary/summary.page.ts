import { Component, OnInit } from '@angular/core';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import {Project} from '../../../models/project';
import {ProjectService} from '../../../services/project.service';
import { ModalController } from '@ionic/angular';
import { PopoverBusinessCanvasComponent } from './popover-business-canvas/popover-business-canvas.component';
import { PopoverProjectSummaryComponent } from './popover-project-summary/popover-project-summary.component';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.page.html',
	styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

	public project:Project = new Project();
	public projectId:string="";


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
		console.log("SummaryPage ngOnInit")
	}

	async openPopover(type:string){
		let modal = await this.modalController.create({
			component: PopoverProjectSummaryComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:type},
		});
		if(type!=="projectSummary"){
			modal = await this.modalController.create({
				component: PopoverBusinessCanvasComponent,
				cssClass: 'my-custom-class',
				componentProps: {homeref:this, type:type},
			});
		}
		
		modal.onWillDismiss().then(
			data=> this.initProject()
			)
		return await modal.present();

	}

	initProject(){
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{
				if(data !==null){
					console.log("initProject dataSharingServiceService", data);
					this.project= data.data;
					this.projectId	= data.id;
				}
				else{
					this.project= new Project();
				}
			})		
	}

	saveProject(project){
		this.projectService.saveProject(this.projectId,project)
		this.modalController.dismiss();
	}

	addElement(element){
		console.log(" element" ,element);
		let data =JSON.parse(element);
		this.projectService.addElement(this.projectId,data.type,data.data).then(
			data=> console.log(data));		

	}
	async updateProject(){
		await this.delay(1000);
		this.projectService.saveProject(this.projectId,this.project)
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
		this.updateProject();
	}
	





}
