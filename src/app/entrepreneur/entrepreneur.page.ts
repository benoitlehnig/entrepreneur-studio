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

import { AngularFireAnalytics } from '@angular/fire/analytics';
import * as moment from 'moment';

import { first,takeWhile} from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-entrepreneur',
	templateUrl: './entrepreneur.page.html',
	styleUrls: ['./entrepreneur.page.scss'],
})
export class EntrepreneurPage implements OnInit {

	public projects;
	public loading;
	public destroyed=false;
	public userIds:any;
	public deletePopupTitle:string="";
	public deletePopupSubTitle:string="";
	public deletePopupCancelButton:string="";
	public deletePopupOKButton:string="";

	public dataSharingUserChangesSub: Subscription = new Subscription();
	public projectsDetailsbyUidSub: Subscription = new Subscription();


	constructor(
		public functions:AngularFireFunctions,
		public projectService:ProjectService,
		public dataSharingServiceService:DataSharingServiceService,
		public navCtrl: NavController,
		public loadingController: LoadingController,
		public modalController: ModalController,
		public alertController: AlertController,
		public translateService:TranslateService,
		public angularFireAnalytics:AngularFireAnalytics

		) { }

	ngOnInit() {
		console.log("EntrepreneurPage >> ngOnInit " );

		this.dataSharingServiceService.getUidChanges().subscribe(
			userIds=>{
				if(userIds){
					console.log("EntrepreneurPage ngOnInit this.userIds", userIds);
					this.userIds =userIds;
				}
			});
		this.dataSharingUserChangesSub = this.dataSharingServiceService.getUserChanges().subscribe(
			user=>{
				if(user){
					
					console.log("EntrepreneurPage ngOnInit user ",user  );
					this.projectsDetailsbyUidSub = this.projectService.getProjectsDetailsbyUid(this.userIds.uid).subscribe(
						(data)=>{
							if(data){
								console.log("EntrepreneurPage >> getProjectsDetailsbyUid data", data)
								this.projects = data;

								this.projects = this.projects.sort((a, b) => {
									return moment(a.data.lastUpdateDateTime).unix()- moment(b.data.lastUpdateDateTime).unix();;
								});
								console.log("getProjectsDetailsbyUid data after sort", data)

							}
						});
					this.dataSharingServiceService.getUserOnBoardingChanges().pipe(first()).subscribe((onBoarding) =>{
						console.log("EntrepreneurPage >> ngOnInit>>  user getUserOnBoardingChanges ",user, onBoarding );
						if(onBoarding){
							if(onBoarding.started ===true || (user.onBoardingDone ===false || user.onBoardingDone === undefined)){
								console.log("EntrepreneurPage >> ngOnInit>>  user getUserOnBoardingChanges >> presentOnboardingPopover",user, onBoarding );
								this.presentOnboardingPopover(0);
							}
						}
						
					});
				}
				else{
					this.dataSharingUserChangesSub.unsubscribe();
					this.projectsDetailsbyUidSub.unsubscribe();
					
				}
			});
		this.initDeleteProject();
	}

	async startNewProject(){
		let project = new Project();
		console.log("startNewProject", project);
		this.angularFireAnalytics.logEvent('page_view', { page_path: '/entrepreneur',  page_title: 'projectOnboarding'});

		this.presentOnboardingPopover(1);

	}
	async startNewProjectOnBoarding(project:any, teamMembers:any){
		this.modalController.dismiss();
		this.createProject(project,teamMembers);
	}

	async createProject(project:any,teamMembers:any){

		const callable = this.functions.httpsCallable('createProject');
		let currentDateTime =moment().toDate();
		project.lastUpdateDateTime = currentDateTime;
		project.creationDateTime = currentDateTime;
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
			this.angularFireAnalytics.logEvent('project_creation',{projectId:res.id});

			
			teamMembers.forEach((teamMember)=>{
				console.log( "EntrepreneurPage >> createProject >> teamMember ," , teamMember)
				if(teamMember.email !=="" && teamMember.email !== undefined && this.emailIsValid(teamMember.email)){
					if(teamMember.email !== this.userIds.email){
						this.projectService.inviteTeamMember( teamMember, res.id).then(function(docRef) {
							console.log("Document written with ID: ", docRef.id);
							const callable = this.functions.httpsCallable('inviteTeamMember');
							let invite ={projectId :  res.id, email: teamMember.email, teamMemberId: docRef.id, project : project};
							const obs = callable(invite)

							obs.subscribe(res => {
								console.log("done", res);
							});
						}.bind(this)).catch(function(error) {
							console.error("Error adding document: ", error);
						});
					}
					else{
						this.projectService.inviteTeamMember( teamMember, res.id);
					}
				}

			});
			this.projectService.createDefaultTimeline(res.id);
			
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
			cssClass: 'popover',
			componentProps: {homeref:this, stepPage:step},

		});
		return await popover.present();
	}
	ngOnDestroy() {
		this.destroyed = true;
		this.dataSharingUserChangesSub.unsubscribe();
		this.projectsDetailsbyUidSub.unsubscribe();
		console.log("ngOnDestroy InDashBoard");
	}

	async requestRemoveProject(projectId, projectName){

		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: this.deletePopupTitle+ " \""+ projectName+"\"",
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
	emailIsValid(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

}
