import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import {DataSharingServiceService} from '../../services/data-sharing-service.service';
import { ModalController } from '@ionic/angular';
import { PopoverProjectSummaryComponent } from './summary/popover-project-summary/popover-project-summary.component';
import {ProjectService} from '../../services/project.service';


@Component({
	selector: 'app-executive',
	templateUrl: './executive.page.html',
	styleUrls: ['./executive.page.scss'],
})
export class ExecutivePage implements OnInit {

	public project:Project = new Project();
	public projectId:string="";

	constructor(
		private dataSharingServiceService : DataSharingServiceService,
		private modalController : ModalController,
		public projectService:ProjectService,

		) { }

	ngOnInit() {
		console.log("ngOnInit ExecutivePage")
		this.initProject()
	}

	initProject(){
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{
				if(data !==null){
					this.project= data.data;
					this.projectId	= data.id;
				}

			})		
	}
	async openPopover(type:string){
		let modal = await this.modalController.create({
			component: PopoverProjectSummaryComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:type},
		});

		modal.onWillDismiss().then(
			data=> this.initProject()
			)
		return await modal.present();

	}
	saveProject(project){
		this.projectService.saveProject(this.projectId,project)
		this.modalController.dismiss();
	}

}
