import { Component, OnInit } from '@angular/core';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { PopoverProjectSummaryComponent } from './executive/summary/popover-project-summary/popover-project-summary.component';
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
		public authService:AuthService,
		public router:Router,
		private menu: MenuController,
		public alertController: AlertController,
		public translateService: TranslateService,
		public modalController:ModalController
		) {


		this.projectId = this.activatedRoute.snapshot.paramMap.get('id');		
		this.initProject();
	}

	ngOnInit() {
		console.log("ProjectPage ngOnInit" );
		this.dataSharingServiceService.getUidChanges().subscribe(
			(uid) =>{
				console.log("ProjectPage uid", uid );
				if(uid){
					this.projectService.getProjectsIdsbyUid(uid.uid,this.projectId).subscribe(
					response => {
						console.log("response", response);
						if(response === undefined){
							this.router.navigate(['/landing-page']);
						}
					})
				}
			})
		this.initProject();

	}



	initProject(){
		console.log("ProjectPage initProject" )

		this.projectService.getProject(this.projectId).subscribe(
			(data)=>{
				if(data){
					console.log("projectService.getProject" , data);
					this.project= data;
					this.dataSharingServiceService.currentProject({id:this.projectId, data: data});
				}

			})
	}


	changeProject(event){
		console.log(event.target.value);
		this.router.navigate(['project/'+event.target.value]);
	}	

	hideMenu(){
		console.log("hideMenu")
		this.menu.toggle();

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

	dismiss(){
		this.modalController.dismiss();
	}

}
