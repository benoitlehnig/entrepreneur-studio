import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {AuthService} from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
	selector: 'app-entrepreneur',
	templateUrl: './entrepreneur.page.html',
	styleUrls: ['./entrepreneur.page.scss'],
})
export class EntrepreneurPage implements OnInit {

	public projects;
	public loading;


	constructor(
		public functions:AngularFireFunctions,
		public projectService:ProjectService,
		public authService:AuthService,
		public navCtrl: NavController,
		public loadingController: LoadingController

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

	async startNewProject(){
		let project = new Project();
		const callable = this.functions.httpsCallable('createProject');
		const obs = callable(project);
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Please wait...',
			duration: 15000
		});
		this.loading.present();
		obs.subscribe(res => {
			console.log("done");
			this.loading.dismiss();
			this.navCtrl.navigateRoot(['project/'+res]);
		});

	}
	

}
