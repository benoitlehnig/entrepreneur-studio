import { Component, OnInit } from '@angular/core';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import {Project} from '../../../models/project';
import {ProjectService} from '../../../services/project.service';
import { ModalController } from '@ionic/angular';
import { PopoverBusinessCanvasComponent } from './popover-business-canvas/popover-business-canvas.component';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.page.html',
	styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

	public project:Project = new Project();
	public projectId:string=""


	constructor(
		public dataSharingServiceService: DataSharingServiceService,
		public projectService:ProjectService,
		public modalController: ModalController,

		) { 
	}


	ngOnInit() {
		this.initProject()
	}

	async openPopover(type:string){
		const component="PopoverProjectSummaryComponent"
		const modal = await this.modalController.create({
			component: PopoverBusinessCanvasComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:type},
			showBackdrop:true
		});
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

			})		
	}

	saveProject(project){
		this.projectService.saveProject(this.projectId,project)
		this.modalController.dismiss();

	}



}
