import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { CMSService} from '../../../../services/cms.service';
import { first } from 'rxjs/operators';
import {Resource} from '../../../../models/project';

import { IonSlides } from '@ionic/angular';


@Component({
	selector: 'app-resource-popover',
	templateUrl: './resource-popover.component.html',
	styleUrls: ['./resource-popover.component.scss'],
})
export class ResourcePopoverComponent implements OnInit {

	@Input("homeref") value;
	@Input("projectId") projectId;
	@ViewChild('slides') slides: IonSlides;
	@Input() resource;

	public tools;
	public labelAttribute:string="name";
	public selectedApplication= {
		id:null,
		CMSId: null,
		name:"",
		source:"",
		title: "",
		imgUrl: "",
		link: "",
		labels:"",
		installationSteps:"",
	}
	public filter={
		categories : [],
		stages:[],
		productName:""
	}
	public slideOpts = {
		initialSlide: 0,
		allowTouchMove:false,
		speed: 400,
		pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true},
		clicks:{slideToClickedSlide: false},
		
	};
	public activeIndex=0;

	public selectedApplicationUrl:string="";

	public selectedButton:string="application";

	public slackButtonHref= "https://slack.com/oauth/v2/authorize?client_id=1226163065714.1534441424722&scope=incoming-webhook,commands&redirect_uri=https://us-central1-entrepeneur-studio.cloudfunctions.net/slackOauthRedirect&state="

	constructor(
		public navParams: NavParams,
		public CMSService:CMSService,

		) { }

	ngOnInit() {


		this.CMSService.retrieveToolsContent(this.filter).pipe(first()).subscribe(
			data=>{
				console.log("CMSService", data)
				if(data !==null){
					this.tools = data.sort((n1,n2) => n1.name.localeCompare(n2.name));

				}

			})

		this.slackButtonHref = this.slackButtonHref+ this.projectId+"&user_scope="


	}
	updateList(){
		console.log(this.filter.categories);
		console.log("this.filter changed",this.filter);
		this.CMSService.retrieveToolsContent(this.filter).pipe(first()).subscribe(
			data=>{
				console.log("CMSService", data)
				this.tools = data;
				if(data !==null){
					this.tools = data.sort((n1,n2) => n1.name.localeCompare(n2.name));
				}
			})
	}

	selectApplication(application){
		console.log("selectApplication", application);
		if(application === 'other'){
			this.selectedApplication.CMSId = null;
			this.selectedApplication.id = null;
			this.selectedApplication.name = "Other";
			this.selectedApplication.source =   "Other";
			this.selectedApplication.title  = "Other";
			this.selectedApplicationUrl  = null;
		}
		else{
			this.selectedApplication = application;
			this.selectedApplicationUrl = application.link;
		}
		

		this.slides.slideNext();
	}
	updateStep(){
		this.slides.getActiveIndex().then(data=>{
			this.activeIndex = data;
			console.log("this.activeIndex",this.activeIndex)
		});


	}

	updateResource(){
			this.resource.CMSId = this.selectedApplication.id;
			this.resource.name = this.selectedApplication.name;
			this.resource.source =  "EntrepreneurStudio";
			this.resource.title  = this.selectedApplication.name;
			this.resource.pictureUrl  =  this.selectedApplication.imgUrl;


		this.resource.url  =  this.checkURL(this.selectedApplicationUrl);
		let requestedResource ={id: this.resource.id, data:this.resource}
		this.navParams.get('homeref').updateResource(requestedResource);
		this.dismiss();
	}
	

	dismiss(){
		this.navParams.get('homeref').dismiss()
	}
	checkURL (url) {
		
		if (!~url.indexOf("http")) {
			url = "http://" + url;
		}
		return url
	}

	segmentChanged(event){
		console.log("resource,", event);
		this.selectedButton = event.detail.value;
		if(this.selectedButton ==='link'){
			this.selectApplication('other');
		}
	}

	addApplicationSlack(){
		

	}

	
}

