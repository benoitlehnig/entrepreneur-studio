import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import {OnBoardingPage} from '../on-boarding/on-boarding.page'

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

	constructor(
		public functions:AngularFireFunctions,
		public projectService:ProjectService,
		public dataSharingServiceService:DataSharingServiceService,
		public navCtrl: NavController,
		public loadingController: LoadingController,
		public popoverController: PopoverController

		) { }

	ngOnInit() {
		console.log("ngOnInit")
		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>{
				if(uid){
					console.log("get ui", uid);
					this.projectService.getProjectbyOwnerUid(uid).subscribe(
						(data)=>{
							console.log(data);
							this.projects = data
						});
				}
			});
		this.dataSharingServiceService.getUserChanges().subscribe(
			user=>{
				if(user){
					
					console.log("EntrepreneurPage >> getUserChanges", user,this.onboardingPopoverDisplayed);
					
					if(this.onboardingPopoverDisplayed === false){
							console.log("display pop pup")
							this.onboardingPopoverDisplayed = true;
							if(this.destroyed ===false){
								this.presentOnboardingPopover()
							}
							
						}
				}
			})
		
		
	}

	async startNewProject(){
		let project = new Project();
		console.log("startNewProject", project)
		const callable = this.functions.httpsCallable('createProject');
		const obs = callable(project);
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Please wait...',
			duration: 15000
		});
		this.loading.present();
		obs.subscribe(res => {
			console.log("done",res);
			this.loading.dismiss();
			this.navCtrl.navigateRoot(['project/'+res.id]);
		});

	}
	async startNewProjectOnBoarding(project:any){
		this.popoverController.dismiss();
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
			this.navCtrl.navigateRoot(['project/'+res.id]);
		});

	}

	async presentOnboardingPopover() {
		
		const popover = await this.popoverController.create({
			component: OnBoardingPage,
			cssClass: 'onboardingPopup',
			translucent: true,
			componentProps: {homeref:this},

		});
		return await popover.present();
	}
	 ngOnDestroy() {
	 	this.destroyed = true;
      console.log("ngOnDestroy InDashBoard");
    }

}
