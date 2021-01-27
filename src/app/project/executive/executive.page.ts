import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import {DataSharingServiceService} from '../../services/data-sharing-service.service';
import { ModalController } from '@ionic/angular';
import { PopoverProjectSummaryComponent } from './summary/popover-project-summary/popover-project-summary.component';
import { PopoverFeedbackComponent } from './summary/popover-feedback/popover-feedback.component';
import {ProjectService} from '../../services/project.service';
import { Subscription } from 'rxjs';
		

@Component({
	selector: 'app-executive',
	templateUrl: './executive.page.html',
	styleUrls: ['./executive.page.scss'],
})
export class ExecutivePage implements OnInit {

	public project:Project = new Project();
	public projectId:string="";
	public teamMembers=[];
	public resources=[];
	public accessRights={read: false, write:false};

	public projectChangesSub: Subscription = new Subscription();
	public projectTeamMembersSub: Subscription = new Subscription();
	public resourcesSub: Subscription = new Subscription();


	constructor(
		private dataSharingServiceService : DataSharingServiceService,
		private modalController : ModalController,
		public projectService:ProjectService,

		) { }

	ngOnInit() {
		this.initProject()
	}

	ionViewWillEnter(){
		
	}
	ngOnDestroy() {
		this.projectChangesSub.unsubscribe();
		this.projectTeamMembersSub.unsubscribe();
		this.resourcesSub.unsubscribe();

	}

	initProject(){
		this.projectChangesSub = this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{
				if(data !==null){
					this.project= data.data;
					this.projectId	= data.id;
					this.accessRights = data.accessRights;
					this.projectTeamMembersSub = this.projectService.getProjectTeamMembers(this.projectId).subscribe(
						teamMembers =>{
							this.teamMembers = teamMembers;
						})
					this.resourcesSub = this.projectService.getResources(this.projectId).subscribe(
						resources=>{
							this.resources = resources;
						})
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

	async openFeedbackPopover(type:string){
		let modal = await this.modalController.create({
			component: PopoverFeedbackComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:type },
		});

		return await modal.present();

	}

	dismiss(){
		this.modalController.dismiss();


	}
	

}
