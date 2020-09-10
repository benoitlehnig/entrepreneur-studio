import { Component, OnInit,Input } from '@angular/core';
import {UserService} from '../services/user.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';

import {User} from '../models/user';
import {Project} from '../models/project';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavParams} from '@ionic/angular';


@Component({
	selector: 'app-on-boarding',
	templateUrl: './on-boarding.page.html',
	styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {

	@Input("homeref") value;

	public user:User = new User();
	public project:Project = new Project();
	public uid:string;
	public step:number=0;

	public loading;


	constructor(
		public userService:UserService,
		public dataSharingServiceService:DataSharingServiceService,
		public functions:AngularFireFunctions,
		public loadingController: LoadingController,
		public navCtrl: NavController,
		public navParams: NavParams,


		) { }

	ngOnInit() {

		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>
			{if(uid){
				this.uid=uid;
			}}
			);
		let getUserChanges= this.dataSharingServiceService.getUserChanges().subscribe(
			user=>{
				if(user){
					this.user=user;
				}
				if(user.profile === undefined){
					user.profile= {
						currentSituation:"",
						experience:"",
						personalMotivation:""

					}
				}
				
			})
		getUserChanges.unsubscribe();

	}

	nextStep(){
		this.step=1;
	}

	async startNewProject(){
		this.userService.setOnboardingDone(this.uid);
		this.navParams.get('homeref').startNewProjectOnBoarding(this.project);

	}
}
