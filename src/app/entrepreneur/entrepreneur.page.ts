import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import {Project} from '../models/project';
import {TeamMember} from '../models/project';
import {ProjectService} from '../services/project.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {OnBoardingPage} from '../on-boarding/on-boarding.page'
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { first } from 'rxjs/operators';

@Component({
	selector: 'app-entrepreneur',
	templateUrl: './entrepreneur.page.html',
	styleUrls: ['./entrepreneur.page.scss'],
})
export class EntrepreneurPage implements OnInit {

	public projects;
	public loading;
	public onboardingPopoverDisplayed:boolean=false;
	public destroyed=false;
	public userIds:any;
	public deletePopupTitle:string="";
	public deletePopupSubTitle:string="";
	public deletePopupCancelButton:string="";
	public deletePopupOKButton:string="";

	constructor(
		public functions:AngularFireFunctions,
		public projectService:ProjectService,
		public dataSharingServiceService:DataSharingServiceService,
		public navCtrl: NavController,
		public loadingController: LoadingController,
		public modalController: ModalController,
		public alertController: AlertController,
		public translateService:TranslateService
		) { }

	ngOnInit() {
		this.dataSharingServiceService.getUidChanges().subscribe(
			userIds=>{
				if(userIds){
					this.userIds =userIds;
				}
			});
		this.dataSharingServiceService.getUserChanges().subscribe(
			user=>{
				if(user){
					if(user.email){
						this.projectService.getProjectsbyTeamMemberEmail(user.email).pipe(first()).subscribe(
							data=>{
								console.log("get getProjecsbyTeamMemberEmail", user.email,data);
							})
					}
					
					

					this.projectService.getProjectsDetailsbyUid(this.userIds.uid).subscribe(
						(data)=>{
							if(data){
								console.log("getProjectsDetailsbyUid data", data)
								this.projects = data
							}
							
						});
					if(this.onboardingPopoverDisplayed === false){
						console.log("display pop pup")
						this.onboardingPopoverDisplayed = true;
						if(this.destroyed ===false && user.onBoardingDone ===false){
							this.presentOnboardingPopover(0);
						}

					}
				}
			});
		this.initDeleteProject();
		
	}

	async startNewProject(){
		let project = new Project();
		console.log("startNewProject", project)
		this.presentOnboardingPopover(1);

	}
	async startNewProjectOnBoarding(project:any, teamMembers:any){
		this.modalController.dismiss();
		this.createProject(project,teamMembers);
	}

	async createProject(project:any,teamMembers:any){
		
		console.log()
		
		const callable = this.functions.httpsCallable('createProject');
		const obs = callable(project);
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Please wait...',
			duration: 15000
		});
		this.loading.present();
		obs.subscribe(res => {
			console.log("done", res);
			this.loading.dismiss();
			
			teamMembers.forEach((teamMember)=>{
				if(teamMember.email !=="" && teamMember.email !== undefined){
					this.projectService.inviteTeamMember( teamMember, res.id).then(function(docRef) {
						console.log("Document written with ID: ", docRef.id);
					}).catch(function(error) {
						console.error("Error adding document: ", error);
					});
				}
				
			});
			
			this.navCtrl.navigateRoot(['project/'+res.id]);
		});


	}

	initDeleteProject(){
		this.translateService.get(['PROJECT.DeletePopupTitle','PROJECT.DeletePopupSubTitle', 'PROJECT.DeletePopupCancelButton', 'PROJECT.DeletePopupOKButton'])
		.pipe(first()).subscribe(
			value => {
				console.log("value", value);
				this.deletePopupTitle = value['PROJECT.DeletePopupTitle'];
				this.deletePopupSubTitle = value['PROJECT.DeletePopupSubTitle']
				this.deletePopupCancelButton = value['PROJECT.DeletePopupCancelButton' ];
				this.deletePopupOKButton = value['PROJECT.DeletePopupOKButton' ];
			});
	}

	async presentOnboardingPopover(step) {

		const popover = await this.modalController.create({
			component: OnBoardingPage,
			cssClass: 'onboardingPopup',
			componentProps: {homeref:this, step:step},

		});
		return await popover.present();
	}
	ngOnDestroy() {
		this.destroyed = true;
		console.log("ngOnDestroy InDashBoard");
	}

	async requestRemoveProject(projectId){

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
					console.log('Confirm Cancel: blah');
				}
			}, {
				text: this.deletePopupOKButton,
				handler: () => {
					this.removeProject(projectId)
				}
			}
			]
		});

		await alert.present();
	}
	removeProject(projectId){
		this.projectService.removeProject(projectId ).then(
			data=>{
			})
	}

	dismiss(){
		this.modalController.dismiss();
	}

}
