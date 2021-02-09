import { Component, OnInit } from '@angular/core';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PopoverFeedbackComponent } from './executive/summary/popover-feedback/popover-feedback.component';

import {TranslateService} from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { PopoverController } from '@ionic/angular';
import {MenuPopoverComponent} from './menu-popover/menu-popover.component';

import {SharingStatusPopoverComponent} from './sharing-status-popover/sharing-status-popover.component';
import { PopoverProjectSummaryComponent } from './executive/summary/popover-project-summary/popover-project-summary.component';

import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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
	public userIds:any={uid:null};
	public expandedMenu:boolean=false;
	public teamMembers=[];
	public resources=[];

	public deletePopupTitle:string="";
	public deletePopupSubTitle:string="";
	public deletePopupCancelButton:string="";
	public deletePopupOKButton:string="";

	public tooltipOptions={
		'show-delay': 500,
		'max-width' : 350
	}

	public commentsPanelDisplayed:boolean = false;
	public comments= [];

	public uidChangesSub: Subscription = new Subscription();
	public projectsIdsbyUidSub: Subscription = new Subscription();
	public projectSub: Subscription = new Subscription();
	public projectTeamMembersSub: Subscription = new Subscription();
	public resourcesSub: Subscription = new Subscription();
	public commentsSub: Subscription = new Subscription();

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
		private cookieService: CookieService
		) {



	}

	ngOnInit() {
		
		console.log("ProjectPage ngOnInit" );
		this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
		this.uidChangesSub = this.dataSharingServiceService.getUidChanges().subscribe(
			(uid) =>{
				console.log("ProjectPage uid", uid );
				if(uid ===null){
					this.userIds.uid="";
				}
				else{
					this.userIds=uid; 
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
		if(this.cookieService.check('commentsPanelDisplayed')){
			if(this.cookieService.get('commentsPanelDisplayed') ==='true'){
				this.commentsPanelDisplayed = true;
			}
			else{
				this.commentsPanelDisplayed = false;
			}
		}
		this.initDeleteProject();
	}

	ngOnDestroy(){
		console.log("ProjectPage >> ngOnDestroy")
		this.uidChangesSub.unsubscribe();
		this.projectsIdsbyUidSub.unsubscribe();
		this.projectSub.unsubscribe();
		this.commentsSub.unsubscribe();

	}

	initDeleteProject(){
		this.translateService.get(['PROJECT.DeletePopupTitle','PROJECT.DeletePopupSubTitle', 'PROJECT.DeletePopupCancelButton', 'PROJECT.DeletePopupOKButton'])
		.pipe(first()).subscribe(
			value => {

				this.deletePopupTitle = value['PROJECT.DeletePopupTitle'];
				this.deletePopupSubTitle = value['PROJECT.DeletePopupSubTitle']
				this.deletePopupCancelButton = value['PROJECT.DeletePopupCancelButton' ];
				this.deletePopupOKButton = value['PROJECT.DeletePopupOKButton' ];
			});
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
		this.projectTeamMembersSub = this.projectService.getProjectTeamMembers(this.projectId).subscribe(
			teamMembers =>{
				this.teamMembers = teamMembers;
			})
		this.resourcesSub = this.projectService.getResources(this.projectId).subscribe(
			resources=>{
				this.resources = resources;
			})
		this.commentsSub = this.projectService.getComments(this.projectId).subscribe(
			data=> {
				this.comments = data;
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


	expandMenu(){
		this.expandedMenu = !this.expandedMenu;
	}

	navigate(page){
		console.log("click");
		this.router.navigate(['/project/'+this.projectId+ '/details/'+page]);
	}
	isSelectedTab(title){
		if(this.router.url.indexOf("details/"+title) !==-1){
			return true
		}
		else{
			return false
		}
		console.log("this.router.url",this.router.url);
	}
	async openFeedbackPopover(type:string){
		let modal = await this.modalController.create({
			component: PopoverFeedbackComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:type },
		});

		return await modal.present();
	}

	async requestRemoveProject(){

		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: this.deletePopupTitle,
			message: this.deletePopupSubTitle,
			buttons: [
			{
				text: this.deletePopupCancelButton,
				role: 'cancel',
				cssClass: 'primary',
				handler: (blah) => {
				}
			}, {
				text: this.deletePopupOKButton,
				handler: () => {
					this.removeProject()
				}
			}
			]
		});

		await alert.present();
	}
	removeProject(){
		this.projectService.removeProject(this.projectId).then(
			data=>{
				this.router.navigate(['entrepreneur/']);
			})
	}

	async presentMenuPopup(ev: any) {
		const popover = await this.popoverController.create({
			component: MenuPopoverComponent,
			componentProps: {homeref:this},
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	dismissMenuPopover(){
		this.popoverController.dismiss();
	}

	toggleCommentsPanel(){
		this.commentsPanelDisplayed = !this.commentsPanelDisplayed;
		if(this.commentsPanelDisplayed === true){
			this.cookieService.set( 'commentsPanelDisplayed', 'true' );

		}
		else{
			this.cookieService.set( 'commentsPanelDisplayed', 'false' );

		}
	}

	
}
