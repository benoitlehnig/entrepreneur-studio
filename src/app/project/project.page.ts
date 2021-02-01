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

import { Subscription } from 'rxjs';

import { AngularFireFunctions } from '@angular/fire/functions';



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

	public uidChangesSub: Subscription = new Subscription();
	public projectsIdsbyUidSub: Subscription = new Subscription();
	public projectSub: Subscription = new Subscription();

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
		public functions:AngularFireFunctions,


		) {



	}

	ngOnInit() {
		
		console.log("ProjectPage ngOnInit" );
		this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
		this.uidChangesSub = this.dataSharingServiceService.getUidChanges().subscribe(
			(uid) =>{
				console.log("ProjectPage uid", uid );
				this.uid=uid; 
				if(uid ===null){

				}
				else{
					const callable = this.functions.httpsCallable('getProjectAccess');
					const obs = callable({projectId: this.projectId});
					obs.subscribe(res => {
						console.log("getProjectAccess", res);
						this.accessRights = res;
						console.log(this.accessRights);
						if(this.accessRights.read === false){
							console.log("this.accessRights.read", this.accessRights.read);
							this.router.navigate(['/intl/fr']);
						}
						else{
							this.initProject();
						}
					});		
				}
			});
	}

	ngOnDestroy(){
		console.log("ProjectPage >> ngOnDestroy")
		this.uidChangesSub.unsubscribe();
		this.projectsIdsbyUidSub.unsubscribe();
		this.projectSub.unsubscribe();
	}

	initProject(){
		this.projectSub = this.projectService.getProject(this.projectId).pipe(first()).subscribe(
			(data)=>{
				if(data){
					console.log("ProjectPage >>ngOnInit>> initProject >> getProject" , data);
					this.project= data;
					this.dataSharingServiceService.currentProject({id:this.projectId, data: this.project, accessRights:this.accessRights});
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
