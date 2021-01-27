import { Component, OnInit } from '@angular/core';
import { AngularXTimelineDataSource } from 'angularx-timeline';
import { TimelineElement } from '../../../models/project';
import {ProjectService} from '../../../services/project.service';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TimelinePopoverComponent } from './timeline-popover/timeline-popover.component';
import { CMSService} from '../../../services/cms.service';
import { first } from 'rxjs/operators';
import { PopoverFeedbackComponent } from '../summary/popover-feedback/popover-feedback.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



import * as moment from 'moment';
@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.page.html',
	styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

	constructor(
		public projectService:ProjectService,
		public dataSharingServiceService:DataSharingServiceService,
		public modalController: ModalController,
		public platform: Platform,
		public CMSService:CMSService,
		private activatedRoute: ActivatedRoute,
		public router:Router,

		) { }


	public projectId:string="";
	public accessRights={read: false, write:false};
	public timeline;
	public selectionChange:boolean=false;
	public selectedTimelineElement = null;
	public selectedTimelineElementDelivrable = [];
	public selectedTools;
	public filter={
		categories : [],
		stages:[],
		productName:""
	}
	public tools;
	public mainOrder=-1;

	ngOnInit() {

		console.log("TimelinePage ngOnInit");
		this.dataSharingServiceService.getCurrentTimelineStepChanges().subscribe(
			(currentStep)=>{
				console.log("currentStep", currentStep )
			}
			)
		this.initProject();
	}

	ionViewWillEnter(){
		console.log("TimelinePage >> ionOnViewEnter >> ngOnInit", this.router.url)

	}


	initProject(){
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{

				if(data !==null){
					console.log("TimelinePage dataSharingServiceService", data);
					this.projectId	= data.id;
					this.accessRights = data.accessRights;

					this.projectService.getTimeline(this.projectId).subscribe(timeline=>{
						console.log("timeline", timeline);
						timeline.sort((a, b) => {
							let orderA = String(a.static.data.mainOrder) + String(a.static.data.itemPosition);
							let orderB = String(b.static.data.mainOrder) + String(b.static.data.itemPosition);
							return Number(orderA) - Number(orderB);
						});
						this.timeline = timeline;
						if(this.selectedTimelineElement===null && this.platform.width() >768){
							this.dataSharingServiceService.getCurrentTimelineStepChanges().subscribe(
								(currentStep)=>{
									console.log("currentStep", currentStep )
									this.mainOrder = Number(currentStep);
									if(this.mainOrder !==-1){
										const index = this.timeline.findIndex(x => Number(x.static.data.mainOrder) === this.mainOrder);
										if(index <=this.timeline.length){
											console.log("index",index, this.timeline.length )
											if(index !==this.timeline.length-1 ){
												this.elementSelected(JSON.stringify(this.timeline[index+1]));
											}
											else{
												this.elementSelected(JSON.stringify(this.timeline[index]));
											}
										}
									}
									else{
										this.elementSelected(JSON.stringify(this.timeline[1]));

									}
								}
								)
						}
					});
				}
			})		
	}

	async elementSelected(event){
		this.selectionChange = true;
		console.log("TimelinePage >> elementSelected", JSON.parse(event));
		this.selectedTimelineElement = JSON.parse(event);
		console.log("platform:: ", this.platform.width());
		
		console.log("selectionChange:: ", this.selectionChange);
		await this.delay(50);
		this.selectionChange = false;
		
		this.filter.stages =[];
		this.filter.categories =[];
		this.filter.stages.push(this.selectedTimelineElement.static.data.stage);
		if(this.selectedTimelineElement.static.data.status ==='draft'){
			this.openFeedbackPopover(this.selectedTimelineElement.static.data.title);
		}
		else{
			if(this.selectedTimelineElement.static.data.toolCategories){
				Object.keys(this.selectedTimelineElement.static.data.toolCategories).forEach(key => {
					this.filter.categories.push(this.selectedTimelineElement.static.data.toolCategories[key]);
				})
			}
			this.selectedTimelineElementDelivrable = this.parseDelivrable(this.selectedTimelineElement.static.data.delivrable);

			
			console.log("this.filter", this.filter)
			this.CMSService.retrieveToolsContent(this.filter).pipe(first()).subscribe(
				data=>{
					console.log("CMSService", data)
					if(data !==null){
						this.tools = data.sort((n1,n2) => n1.name.localeCompare(n2.name));

					}
					if(this.platform.width() <768){
						this.presentTimelinePopoverComponent()

					}
				});
			
		}
		

	}

	parseDelivrable(delivrable){
		let parsedDelivrable =[];
		if(delivrable){

			let UL = delivrable.split("<ul>")[1].split("</ul>")[0];
			let LIs = UL.split("<li>");

			for(var i=0;i<LIs.length;i++){
				LIs[i] = LIs[i].split("</li>")[0];
			}
			for(var i=0; i<LIs.length;i++){

				let parsedDelivrableItem = {
					title:"",
					linkText:"",
					link:"",
					type:""

				};
				console.log("parsedDelivrable LI ", i , LIs[i] );

				if(LIs[i].indexOf("<a href") !==-1){
					console.log("parsedDelivrabl link, ", LIs[i].split("\">")[1]);

					parsedDelivrableItem.title = LIs[i].split("<")[0];
					parsedDelivrableItem.linkText = LIs[i].split("\">")[1].split("</a>")[0];
					parsedDelivrableItem.link =LIs[i].split("<a href=\"")[1].split("\" target")[0];
					console.log("parsedDelivrable, ", LIs[i].split("<a href=\"")[1] )
					console.log("parsedDelivrable, ", LIs[i].split("<a href=\"")[1] )
					if(parsedDelivrableItem.link.indexOf("-ES-")!==-1){
						parsedDelivrableItem.type="ES"
					}
					else{
						parsedDelivrableItem.type="web"
					}

				}
				else{
					parsedDelivrableItem.title = LIs[i];
				}
				if(parsedDelivrableItem.title !=="" || parsedDelivrableItem.linkText !==""){
					parsedDelivrable.push(parsedDelivrableItem);

				}
			}
			console.log("parsedDelivrable, LIs", LIs)

			console.log("parsedDelivrable, ", delivrable, parsedDelivrable)
		}
		
		return parsedDelivrable;

	}
	async presentTimelinePopoverComponent() {

		const popover = await this.modalController.create({
			component: TimelinePopoverComponent,
			cssClass: 'onboardingPopup',
			componentProps: {homeref:this, timelineElement:this.selectedTimelineElement, projectId:this.projectId,tools: this.tools,
				delivrable: this.selectedTimelineElementDelivrable, accessRights:this.accessRights},

			});
		console.log("presentTimelinePopoverComponent >> ",popover.componentProps)
		return await popover.present();
	}

	saveTimelineElement(){
		if(this.selectedTimelineElement.timelineElement.data.status ==='done'){
			this.selectedTimelineElement.timelineElement.data.endDate = moment().format();
			if(!this.selectedTimelineElement.timelineElement.data.startDate){
				this.selectedTimelineElement.timelineElement.data.startDate = moment().format();
			}
		}
		else{
			this.selectedTimelineElement.timelineElement.data.endDate=null
		}
		if(this.selectedTimelineElement.timelineElement.data.status ==='ongoing'){
			this.selectedTimelineElement.timelineElement.data.startDate = moment().format();
		}
		
		this.projectService.saveTimelineElement(this.projectId, this.selectedTimelineElement );
	}
	isSelected(timelineElement){
		if(this.selectedTimelineElement){
			return timelineElement.static.timelineElementId ===this.selectedTimelineElement.static.timelineElementId 
		}
		
	}

	getForecastedStartDate(timelineElement){
		let startDate= moment();
		if(timelineElement.static.order !==0){
			if(timelineElement.timelineElement.data.status ==='todo'){
				console.log("order: ", timelineElement, timelineElement.static.data.order);
				const found = this.timeline.find(element => element.static.data.order = (timelineElement.static.data.order-1));
				console.log("order2: ", found);
				startDate = startDate.add(timelineElement.static.estimatedDuration, 'days');
			}

		}
		return startDate;
	}

	dismiss(){
		this.modalController.dismiss();
	}
	delay(ms: number) {
		return new Promise( resolve => setTimeout(resolve, ms) );
	}


	async openFeedbackPopover(type:string){
		let modal = await this.modalController.create({
			component: PopoverFeedbackComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:type },
		});

		return await modal.present();

	}
	createDefaultTimeline(){
		this.projectService.createDefaultTimeline(this.projectId);
	}

}
