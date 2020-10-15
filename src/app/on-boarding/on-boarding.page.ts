import { Component, OnInit,Input } from '@angular/core';
import {UserService} from '../services/user.service';
import {AutocompleteService} from '../services/autocomplete.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import {AutoCompleteOptions} from 'ionic4-auto-complete';

import {User} from '../models/user';
import {Project} from '../models/project';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavParams} from '@ionic/angular';

import {TranslateService} from '@ngx-translate/core';

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
	public currentSituationItems =[];
	public personalMotivationItems =[];
	public experienceItems =[];
	public projectMaturityItems =[];
	public projectTeamItems =[];
	public projectTeamProfileItems =[];
	public financialResourcesItems =[];
	public customPopoverOptions: any = {
		cssClass:'largerOptionPopover'
	};

	public loading;
	public domainOptions:AutoCompleteOptions;

	public otherDomain= [];
	public selected = [];
	public providerDomains=null;

	
	constructor(
		public userService:UserService,
		public dataSharingServiceService:DataSharingServiceService,
		public functions:AngularFireFunctions,
		public loadingController: LoadingController,
		public navCtrl: NavController,
		public navParams: NavParams,
		public translateService : TranslateService,


		) { 
		this.providerDomains = new AutocompleteService('domains');

		this.domainOptions = new AutoCompleteOptions();
		this.domainOptions.autocomplete = 'on';
		this.domainOptions.debounce = 750;
		this.domainOptions.searchIcon = 'assets/icons/add-user.svg';
		this.domainOptions.type = '';

	}

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

		for (let i =1; i<7; i++){
			this.translateService.get('ONBOARDINGPAGE.CurrentSituationItem'+i).subscribe(
				value => {
					this.currentSituationItems.push({index:i,text:value});
				})
		}
		for (let i =1; i<4; i++){
			this.translateService.get('ONBOARDINGPAGE.ExperienceItem'+i).subscribe(
				value => {
					this.experienceItems.push({index:i,text:value});
				})
		}
		for (let i =1; i<6; i++){
			this.translateService.get('ONBOARDINGPAGE.MotivationItem'+i).subscribe(
				value => {
					this.personalMotivationItems.push({index:i,text:value});
				})
		}
		for (let i =1; i<5; i++){
			this.translateService.get('ONBOARDINGPAGE.ProjectMaturityItem'+i).subscribe(
				value => {
					this.projectMaturityItems.push({index:i,text:value});
				})
		}
		for (let i =1; i<5; i++){
			this.translateService.get('ONBOARDINGPAGE.ProjectTeamItem'+i).subscribe(
				value => {
					this.projectTeamItems.push({index:i,text:value});
				})
		}
		for (let i =1; i<5; i++){
			this.translateService.get('ONBOARDINGPAGE.ProjectTeamProfileItem'+i).subscribe(
				value => {
					this.projectTeamProfileItems.push({index:i,text:value});
				})
		}
		for (let i =1; i<5; i++){
			this.translateService.get('ONBOARDINGPAGE.FinancialResourcesItem'+i).subscribe(
				value => {
					this.financialResourcesItems.push({index:i,text:value});
				})
		}

	}

	nextStep(){
			console.log(this.project);
		this.step++;
	}

	async startNewProject(){

		this.userService.setOnboardingDone(this.uid);
		this.navParams.get('homeref').startNewProjectOnBoarding(this.project);

	}
}
