import { Component, OnInit,Input,ViewChild } from '@angular/core';
import {UserService} from '../services/user.service';
import {AutocompleteService} from '../services/autocomplete.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import {TeamMember} from '../models/project';

import {AutoCompleteOptions} from 'ionic4-auto-complete';
import { IonSlides } from '@ionic/angular';

import {User} from '../models/user';
import {Project} from '../models/project';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavParams} from '@ionic/angular';
import { first } from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-on-boarding',
	templateUrl: './on-boarding.page.html',
	styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {

	@Input("homeref") value;
	@Input("stepPage") stepPage;
	@ViewChild('slides') slides: IonSlides;

	public user:User = new User();
	public project:Project = new Project();
	public userIds;
	public step:number=0;
	public currentSituationItems =[];
	public domainItems =[];
	public domainSelectedItems =[];
	public personalMotivationItems =[];
	public experienceItems =[];
	public projectMaturityItems =[];
	public projectTeamItems =[];
	public projectTeamProfileItems =[];
	public financialResourcesItems =[];
	public projectProfilesItems =[];
	public roleItems =[];
	public selectedIndex;
	public customPopoverOptions: any = {
		cssClass:'largerOptionPopover'
	};

	public slideOpts = {
		initialSlide: 0,
		allowTouchMove:false,
		speed: 400,
		pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true},
		clicks:{slideToClickedSlide: false},
		
	};

	public loading;
	public domainOptions:AutoCompleteOptions;

	public otherDomain= [];
	public selected = [];
	public providerDomains=null;

	public teamMembers:Array<TeamMember>= []

	
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

		this.dataSharingServiceService.getUidChanges().pipe(first()).subscribe(
			uid=>
			{
				if(uid){
					this.userIds=uid;
					let teamMember = new TeamMember();
					teamMember.uid = this.userIds.uid; 
					teamMember.email = this.userIds.email; 
					this.teamMembers.push(teamMember,new TeamMember());
					
				}}
				);
		let getUserChanges= this.dataSharingServiceService.getUserChanges().pipe(first()).subscribe(
			user=>{
				if(user){
					this.user=user;
					console.log("getUserChanges",this.user)
				}
				if(user.profile === undefined){
					user.profile= {
						currentSituation:"",
						experience:"",
						personalMotivation:""

					}
				}
				
			})

		

		
		this.translateService.get('ONBOARDINGPAGE.CurrentSituationItems').subscribe(
			value => {
				if(value){
					this.currentSituationItems = this.returnArrary(value);
				}
			});
		this.translateService.get('ONBOARDINGPAGE.DomainItems').subscribe(
			value => {
				if(value){
					this.domainItems = this.returnArrary(value);
				}
			})
		this.translateService.get('ONBOARDINGPAGE.ExperienceItems').subscribe(
			value => {
				this.experienceItems = this.returnArrary(value);
			})

		this.translateService.get('ONBOARDINGPAGE.MotivationItems').subscribe(
			value => {
				this.personalMotivationItems= this.returnArrary(value);
			})
		
		
		this.translateService.get('ONBOARDINGPAGE.ProjectMaturityItems').subscribe(
			value => {
				this.projectMaturityItems = this.returnArrary(value);
			})
		
		
		this.translateService.get('ONBOARDINGPAGE.ProjectTeamItems').subscribe(
			value => {
				this.projectTeamItems = this.returnArrary(value);
			})
		
		this.translateService.get('ONBOARDINGPAGE.ProjectTeamProfileItems').subscribe(
			value => {
				this.projectTeamProfileItems= this.returnArrary(value);
			})
		this.translateService.get('TEAM.ProjectProfiles').subscribe(
			value => {
				this.projectProfilesItems= this.returnArrary(value);
			})
		
		this.translateService.get('ONBOARDINGPAGE.FinancialResourcesItems').subscribe(
			value => {
				this.financialResourcesItems= this.returnArrary(value);
			})
		this.translateService.get('TEAM.Roles').subscribe(
			value => {
				if(value){
					this.roleItems = this.returnArrary(value);
				}
			})
		

	}

	returnArrary(input){
		let arr=[];
		Object.keys(input).map(function(key){  
			arr.push({index: key, text:input[key]})  
			return arr;  
		});
		console.log("array", arr, input)
		return arr 
	}

	nextStep(){
		console.log(this.project);
		this.slides.slideNext();
		console.log("this.step", this.step);
		this.step++;
	}

	async startNewProject(){

		this.userService.setOnboardingDone(this.userIds.uid);
		this.navParams.get('homeref').startNewProjectOnBoarding(this.project, this.teamMembers);

	}
	requestAddTeamMember(){
		this.teamMembers.push(new TeamMember());
	}
	removeTeamMember(index){
		this.teamMembers.splice(index,1);
	}

	dismiss(){
		this.navParams.get('homeref').dismiss()
	}

	domainChecked(event, domainItem){
		console.log(event,domainItem);
		if(event.detail.checked ===true){
			this.domainSelectedItems.push({code: domainItem.index,
				full_name: domainItem.text});
		}
		else{
			const index = this.domainSelectedItems.indexOf(domainItem, 0);
			if (index > -1) {
				this.domainSelectedItems.splice(index, 1);
			}
		}
		console.log(this.domainSelectedItems);
		this.project.domains= this.domainSelectedItems;
	}

}
