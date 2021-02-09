import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import {UserService} from '../../../services/user.service';
import {Project} from '../../../models/project';
import {User} from '../../../models/user';
import {SendInvitationComponent} from './send-invitation/send-invitation.component';
import {FindSkillsPopoverComponent} from './find-skills-popover/find-skills-popover.component';
import {SkillSearchesPopoverComponent} from './skill-searches-popover/skill-searches-popover.component';

import { first } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-team',
	templateUrl: './team.page.html',
	styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

	public project:Project = new Project();
	public projectId:string="";
	public accessRights={read: false, write:false};

	public uid:string="";
	public roleItems:Array<any>=[];
	public projectProfilesItems:Array<any>=[];
	public customAlertOptions: any = {
		cssClass: 'selectAlertClass',
	};
	public tooltipOptions={
		'show-delay': 500,
		'max-width' : 350
	}

	public teamMembers=[];
	public projectProfiles=[];
	public skillSearches =[]

	public uidChangesSub: Subscription = new Subscription();
	public projectsIdsbyUidSub: Subscription = new Subscription();
	public projectSub: Subscription = new Subscription();
	public projectTeamMembersSub: Subscription = new Subscription();
	public skillSearchersSub: Subscription = new Subscription();


	constructor(
		public dataSharingServiceService:DataSharingServiceService,
		public userService:UserService,
		public projectService:ProjectService,
		public modalController: ModalController,
		public translateService : TranslateService

		) { }

	ionViewWillEnter(){
		console.log("TeamPage ionViewWillEnter")

		this.initProject();
		this.uidChangesSub = this.dataSharingServiceService.getUidChanges().subscribe(
			userIds=>{
				if(userIds){
					this.uid =userIds.uid;
				}
			});
		this.translateService.get('TEAM.Roles').pipe(first()).subscribe(
			value => {
				if(value){
					this.roleItems = this.returnArrary(value);
				}
			})
		this.translateService.get('TEAM.ProjectProfiles').pipe(first()).subscribe(
			value => {
				if(value){
					this.projectProfilesItems = this.returnArrary(value);
				}
			})

	}
	ngOnInit() {
		console.log("TeamPage ngOnInit")
	}
	ngOnDestroy(){
		this.projectSub.unsubscribe();
		this.projectTeamMembersSub.unsubscribe();
		this.skillSearchersSub.unsubscribe();
	}

	

	async initProject(){
		this.projectSub = this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{
				if(data !==null){
					console.log("initProject dataSharingServiceService", data);
					this.project= data.data;
					this.projectId	= data.id;
					this.accessRights = data.accessRights;
					this.skillSearchersSub = this.projectService.getSkillSearchers(this.projectId).subscribe(
						skillSearches =>{
							this.skillSearches = skillSearches;
						})
					this.projectTeamMembersSub = this.projectService.getProjectTeamMembers(this.projectId).subscribe(
						async data=>{
							if(this.teamMembers.length !== data.length){
								this.teamMembers = data;
								for(let i=0;i<this.teamMembers.length;i++){
									
									if(this.teamMembers[i].profile === undefined || this.teamMembers[i].profile === null){
										let  userService = await this.userService.getUserDetails(this.teamMembers[i].uid).pipe(first()).subscribe(
											data=>{
												if(data){
													console.log("this.userService.getUserDetails" ,data)
													this.teamMembers[i].profile = data;
													userService.unsubscribe();

												}
											})
									}

								}
							}
							this.projectProfiles = [];
							for(let i=0;i<this.teamMembers.length;i++){
								for(let j=0;j<this.teamMembers[i].projectProfile.length;j++){
									if(this.projectProfiles.indexOf((this.teamMembers[i].projectProfile[j]) !==-1)){
										this.projectProfiles.push(this.teamMembers[i].projectProfile[j]);

									}
								}
							}
							


						})
					this.projectSub.unsubscribe();
				}

			});
		

		


	}
	async requestNewMember(){
		let modal = await this.modalController.create({
			component: SendInvitationComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, projectId:this.projectId, teamMembers:this.teamMembers, project:this.project},
		});


		modal.onWillDismiss()
		return await modal.present();
	}

	closePopUp(){
		this.modalController.dismiss();
	}

	removeTeamMember(teamMember){
		this.projectService.removeTeamMember(this.projectId, teamMember);
	}
	updateProfile(teamMember){
		this.projectService.updateTeamMember(this.projectId, teamMember);
	}

	returnArrary(input){
		let arr=[];
		Object.keys(input).map(function(key){  
			arr.push({index: key, text:input[key]})  
			return arr;  
		});
		return arr 
	}

	async requestFindSkills(){
		let modal = await this.modalController.create({
			component: FindSkillsPopoverComponent,
			cssClass: 'popover',
			componentProps: {homeref:this, projectId:this.projectId},
		});


		modal.onWillDismiss()
		return await modal.present();
	}

	dismissFindSkillsPopover(){
		this.modalController.dismiss();
	}

	async displaySkillSearches(){
		let modal = await this.modalController.create({
			component: SkillSearchesPopoverComponent,
			cssClass: 'popover',
			componentProps: {homeref:this, projectId:this.projectId},
		});


		modal.onWillDismiss()
		return await modal.present();
	}
	dismissSkillSearchesPopover(){
		this.modalController.dismiss();
	}



}
