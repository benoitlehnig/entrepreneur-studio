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
import { first } from 'rxjs/operators';

import { PopoverController } from '@ionic/angular';

import {SharingStatusPopoverComponent} from './sharing-status-popover/sharing-status-popover.component';


import { PopoverProjectSummaryComponent } from './executive/summary/popover-project-summary/popover-project-summary.component';

@Component({
	selector: 'app-project',
	templateUrl: './project.page.html',
	styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

	public project:Project= new Project();
	public projectId:string="";
	public writeAccess:boolean=false;
	public accessRights={read: false, write:false};
	public projectsIdsbyUid=[];
	public uid=null;

	constructor(
		public projectService:ProjectService,
		private activatedRoute: ActivatedRoute,
		public dataSharingServiceService:DataSharingServiceService,
		public authService:AuthService,
		public router:Router,
		private menu: MenuController,
		public alertController: AlertController,
		public translateService: TranslateService,
		public modalController:ModalController,
		public popoverController: PopoverController,

		) {


		this.projectId = this.activatedRoute.snapshot.paramMap.get('id');		
		this.initProject();
	}

	ngOnInit() {
		console.log("ProjectPage ngOnInit" );
		this.dataSharingServiceService.getUidChanges().subscribe(
			(uid) =>{
				console.log("ProjectPage uid", uid );
				this.uid=uid; 
				if(uid){
					this.projectService.getProjectsIdsbyUid(uid.uid,this.projectId).subscribe(
						response => {
							console.log("ProjectPage >>ngOnInit>> getProjectsIdsbyUid response", response);
							this.projectsIdsbyUid= response;
							this.projectService.getProject(this.projectId).pipe(first()).subscribe(
								(data)=>{
									if(data){
										if(!this.project.sharingStatus){
											this.project.sharingStatus = "private";
										}
										this.checkWriteAccess();
										console.log("ProjectPage >>ngOnInit>> initProject >> getProject, writeAccess, navigate" ,this.project, this.writeAccess , data.sharingStatus);

										if(this.writeAccess===false && data.sharingStatus ==='private'){
											this.router.navigate(['/intl/fr']);
										}
										else{
											this.initProject();		
										}
									}
								})
						})
				}
				else{

					this.projectService.getProject(this.projectId).pipe(first()).subscribe(
						(data)=>{
							if(data){
								if(!this.project.sharingStatus){
									this.project.sharingStatus = "private";
								}
								this.checkWriteAccess();
								console.log("ProjectPage >>ngOnInit>> initProject >> getProject, writeAccess, navigate" ,this.project, this.writeAccess , data.sharingStatus);

								if(this.writeAccess===false && data.sharingStatus ==='private'){
									this.router.navigate(['/intl/fr']);
								}
								else{
									this.initProject();
								}
							}
						})
				}
			})
		

	}



	initProject(){
		this.projectId = this.activatedRoute.snapshot.paramMap.get('id');	
		console.log("ProjectPage initProject", this.projectId  )
		this.projectService.getProject(this.projectId).pipe(first()).subscribe(
			(data)=>{
				if(data){
					console.log("ProjectPage >>ngOnInit>> initProject >> getProject" , data);
					this.project= data;
					this.dataSharingServiceService.currentProject({id:this.projectId, data: this.project, accessRights:this.accessRights});
				}
			})
	}

	checkWriteAccess(){
		if(this.projectsIdsbyUid === undefined ){
			this.writeAccess=false;
		}
		else if(this.projectsIdsbyUid.length === 0 ){
			this.writeAccess=false;
		}
		else{
			this.writeAccess=true;
		}
		if(this.writeAccess===false && this.project.sharingStatus ==='public'){
			this.accessRights.read=true;
		}
		if(this.writeAccess===true){
			this.accessRights.read=true;
			this.accessRights.write=true;
		}
		this.dataSharingServiceService.currentProject({id:this.projectId, data: this.project, accessRights:this.accessRights});
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
	async presentSharingStatusPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: SharingStatusPopoverComponent,
			componentProps: {homeref:this, projectId:this.projectId},
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	dismissSharingStatusPopover(){
		this.popoverController.dismiss();
	}

	updateStatus(status){
		this.dismissSharingStatusPopover();
		this.project.sharingStatus = status;
		this.dataSharingServiceService.currentProject({id:this.projectId, data: this.project, accessRights:this.accessRights});
	}



}
