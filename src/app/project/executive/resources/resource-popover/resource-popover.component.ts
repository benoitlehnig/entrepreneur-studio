import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { CMSService} from '../../../../services/cms.service';
import { first } from 'rxjs/operators';
import {Resource} from '../../../../models/project';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToolService} from  '../../../../services/tool.service';
import { Subscription } from 'rxjs';




@Component({
	selector: 'app-resource-popover',
	templateUrl: './resource-popover.component.html',
	styleUrls: ['./resource-popover.component.scss'],
})
export class ResourcePopoverComponent implements OnInit {

	@Input("homeref") value;
	@Input("projectId") projectId;
	@Input("resource") resource;

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
		installationDescription:"",
		nativeIntegrationAvailable:false
	}
	public filter={
		categories : [],
		stages:[],
		productName:""
	}
	public nativelyIntegratedApplicationNumber=0;
	
	public activeIndex=0;

	public selectedApplicationUrl:string="";

	public selectedButton:string="application";
	public selectedAppButton:string="description";

	public categories=[]

	//SLACK
	public slackButtonHref= "https://slack.com/oauth/v2/authorize?client_id=1226163065714.1534441424722&scope=incoming-webhook,commands&redirect_uri=https://us-central1-entrepeneur-studio.cloudfunctions.net/slackOauthRedirect&state="
	//drive
	public driveButtonHref= "";

	public categoriesChangesSub: Subscription = new Subscription();


	constructor(
		public navParams: NavParams,
		public CMSService:CMSService,
		private functions: AngularFireFunctions,
		private toolService: ToolService,

		) { }

	ngOnInit() {
		this.updateList();
		this.slackButtonHref = this.slackButtonHref+ this.projectId+"&user_scope="
		this.getDriveUrl();
		if(this.resource){
			console.log("resource", this.resource);
			this.toolService.getTool(this.resource.id).subscribe(
				data =>{
					this.selectApplication(data);
				}
				);
		}
		this.categoriesChangesSub = this.toolService.getCategories().subscribe(
			data =>{
				console.log("categories", data)
				this.categories = data;
				this.categories = this.categories.sort((n1,n2) => n1.labelFrench.localeCompare(n2.labelFrench));
			}
			);

	}

	ngOnDestroy(){
		this.categoriesChangesSub.unsubscribe();
	}
	updateList(){
		this.CMSService.retrieveToolsContent(this.filter).pipe(first()).subscribe(
			data=>{
				this.nativelyIntegratedApplicationNumber = 0;
				if(data !==null){
					this.tools = data.sort((n1,n2) => n1.name.localeCompare(n2.name));
					for(let i =0; i< this.tools.length;i++){
						if(this.tools[i].nativeIntegrationAvailable === true){
							this.nativelyIntegratedApplicationNumber  = this.nativelyIntegratedApplicationNumber +1 ;
						}
					}
				}
			})
	}

	selectApplication(application){
		console.log("selectApplication", application)
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
		this.updateStep('forward');
	}

	updateStep(direction:string){
		if(direction ==='forward'){
			this.activeIndex =1
		}
		else{
			this.activeIndex =0
		}
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
		this.selectedButton = event.detail.value;
		if(this.selectedButton ==='link'){
			this.selectApplication('other');
		}
	}
	segmentAppChanged(event){
		this.selectedAppButton = event.detail.value;
	}

	
	getDriveUrl(){
		const callable = this.functions.httpsCallable('getGoogleDriveAuthenticationUrl');
		const obs = callable({projectId:this.projectId});
		obs.subscribe(async res => {
			this.driveButtonHref = res;
		});
	}
	getCategoryLabel(id){
		const categoryLabels:any = this.categories.filter(
			function(data){ return data.id == id }
			)
		if(categoryLabels.length>0){
			return categoryLabels[0].labelFrench
		}
	}

}

