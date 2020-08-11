import { Component, OnInit } from '@angular/core';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverProjectSummaryComponent } from './executive/summary/popover-project-summary/popover-project-summary.component';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-project',
	templateUrl: './project.page.html',
	styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

	public project:Project= new Project();
	public projectId:string="";


	constructor(
		public projectService:ProjectService,
		private activatedRoute: ActivatedRoute,
		public dataSharingServiceService:DataSharingServiceService,
		public modalController: ModalController,


		) { }

	public selectedIndex = 0;

	public pages = [

	{
		title: 'Executive',
		url: 'executive',
		icon: 'person'
	},
	{
		title: 'Ideation',
		url: 'ideation',
		icon: 'shield-checkmark'
	},
	{
		title: 'Creation',
		url: 'creation',
		icon: 'people-circle'
	}
	];


	ngOnInit() {
		this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
		this.initProject();
		
	}

	initProject(){
		this.projectService.getProject(this.projectId).subscribe(
			(data)=>{
				console.log(data);
				this.project= data;
				this.dataSharingServiceService.currentProject({id:this.projectId, data: data});
			})

	}
	selectTabNavigation(){
		const path = window.location.pathname;
		if (path !== undefined) {
			this.selectedIndex = this.pages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().split("/")[1]);
		}
	}

	async openPopover(type:string){
		const component="PopoverProjectSummaryComponent"
		const modal = await this.modalController.create({
			component: PopoverProjectSummaryComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this},

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
