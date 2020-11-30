import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import {UserService} from '../../../services/user.service';
import {Project} from '../../../models/project';
import {User} from '../../../models/user';
import {SendInvitationComponent} from './send-invitation/send-invitation.component';
import { first } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-team',
	templateUrl: './team.page.html',
	styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

	public project:Project = new Project();
	public projectId:string="";
	public uid:string="";
	public roleItems:Array<any>=[];
	public projectProfilesItems:Array<any>=[];
	public customAlertOptions: any = {
		cssClass: 'selectAlertClass',
	};

	public teamMembers=[];
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
		this.dataSharingServiceService.getUidChanges().pipe(first()).subscribe(
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

	

	initProject(){
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{

				if(data !==null){
					console.log("initProject dataSharingServiceService", data);
					this.project= data.data;
					this.projectId	= data.id;
					if(this.teamMembers.length ===0){
						this.projectService.getProjectTeamMembers(this.projectId).subscribe(
							data=>{
								if(this.teamMembers.length !== data.length){
									this.teamMembers = data;
									for(let i=0;i<this.teamMembers.length;i++){
										this.userService.getUserDetails(this.teamMembers[i].uid).pipe(first()).subscribe(
											data=>{
												if(data){
													console.log("this.userService.getUserDetails" ,data)
													this.teamMembers[i].profile = data;
												}
											})
									}
								}
								
							})
					}
				}
			})		
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



}
