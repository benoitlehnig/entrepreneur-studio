import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {AuthService} from '../services/auth.service';
import { NavController } from '@ionic/angular';


@Component({
	selector: 'app-entrepreneur',
	templateUrl: './entrepreneur.page.html',
	styleUrls: ['./entrepreneur.page.scss'],
})
export class EntrepreneurPage implements OnInit {

	projects;

	constructor(
		public functions:AngularFireFunctions,
		public projectService:ProjectService,
		public authService:AuthService,
		public navCtrl: NavController,

		) { }

	ngOnInit() {
		this.authService.getUserDetails().subscribe(
			data=>{
				if(data){
					console.log("getUserDetails", data);
					this.projectService.getProjectbyOwnerUid(data.uid).subscribe(
						(data)=>{
							console.log(data);
							this.projects = data
						});
				}
			});
	}

	startNewProject(){
		let project = new Project();
		const callable = this.functions.httpsCallable('createProject');
		const obs = callable(project);
		obs.subscribe(res => {
			console.log("done");
			this.navCtrl.navigateRoot(['project/'+res]);
		});

	}

}
