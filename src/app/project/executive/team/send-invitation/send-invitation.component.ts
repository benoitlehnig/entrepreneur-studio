import { Component, OnInit,Input } from '@angular/core';
import {TeamMember} from '../../../../models/project';
import {ProjectService} from '../../../../services/project.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToastController } from '@ionic/angular';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-send-invitation',
	templateUrl: './send-invitation.component.html',
	styleUrls: ['./send-invitation.component.scss'],
})
export class SendInvitationComponent implements OnInit {

	public teamMember: TeamMember= new TeamMember();
	public displayErrorAlreadyMember:boolean=false;

	@Input("homeref") value;
	@Input("projectId") projectId;
	@Input("project") project;
	@Input("teamMembers") teamMembers;


	constructor(
		public projectService:ProjectService,
		public functions:AngularFireFunctions,
		public toastController: ToastController,
		public navParams : NavParams,
		)
	{ }

	ngOnInit() {}

	addNewMember(){
		console.log("addNewMember, ", this.teamMember);
		console.log("addNewMembers, ", this.teamMembers);
		let existingMembers =  this.teamMembers.find(x => x.email == this.teamMember.email);
		console.log("existingMembers	", existingMembers);
		if(existingMembers === undefined){
			
			this.displayErrorAlreadyMember = false;
			this.projectService.inviteTeamMember(this.teamMember, this.projectId).then(function(docRef) {
				console.log("Document written with ID: ", docRef.id);
				const callable = this.functions.httpsCallable('inviteTeamMember');
				let invite ={projectId : this.projectId, email: this.teamMember.email, teamMemberId: docRef.id, project : this.project};
				const obs = callable(invite)

				obs.subscribe(res => {
					console.log("done", res);
				});
				this.presentToast();
				this.navParams.get('homeref').closePopUp();
			}.bind(this))
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
		}
		else{
			this.displayErrorAlreadyMember = true;
			console.log("already existing");
		}
		
	}
	async presentToast() {
		const toast = await this.toastController.create({
			message: 'Invitation envoyée',
			duration: 4000,
			position:'top'
		});
		toast.present();
	}

	dismiss(){
		this.navParams.get('homeref').closePopUp();
	}
}
