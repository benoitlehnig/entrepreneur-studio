import { Component, OnInit } from '@angular/core';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import {Project} from '../../../models/project';
import {ProjectService} from '../../../services/project.service';
import { ModalController } from '@ionic/angular';
import { PopoverBusinessCanvasComponent } from './popover-business-canvas/popover-business-canvas.component';
import { PopoverSocialNetworkComponent } from './popover-social-network/popover-social-network.component';
import * as moment from 'moment';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import {CommentsComponent} from '../comments/comments.component';




@Component({
	selector: 'app-summary',
	templateUrl: './summary.page.html',
	styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

	public project:Project = new Project();
	public projectId:string="";
	public projectInit:boolean = false;
	public backgroundPicture:string="";
	public accessRights={read: false, write:false};



	public socialNetworks=[
	{type: "facebook"},{type: "linkedIn"},{type: "instagram"},{type: "twitter"},{type: "youtube"}]

	public updateOnGoing:boolean= false;
	public timeline=[];
	public timelineStat=[];
	public lastUpdateTime =moment();
	public width= this.platform.width();

	constructor(
		public dataSharingServiceService: DataSharingServiceService,
		public projectService:ProjectService,
		public modalController: ModalController,
		public platform: Platform,
		public router:Router,
		) { 
		
	}

	ionViewWillEnter(){
		console.log("SummaryPage ionViewWillEnter")

		this.initProject();

	}
	ngOnInit() {

	}

	

	initProject(){
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{
				if(data !==null){
					this.projectInit = true;
					this.projectId	= data.id
					this.accessRights = data.accessRights;
					if(data.data !==null){
						console.log("SummaryPage initProject dataSharingServiceService", data);
						this.project= data.data;
						if(this.project.theme){
							this.backgroundPicture = this.project.theme.backgroundPictureUrl;
							console.log("initProject backgroundPicture", this.backgroundPicture);

						}
						this.projectService.getTimeline(this.projectId).subscribe(timeline=>{
							console.log("SummaryPage >> initProject getTimeline", timeline);
							if(timeline){
								timeline.sort((a, b) => {
									return a.static.data.mainOrder - b.static.data.mainOrder;
								});
								this.timeline = timeline;
								this.timelineStat=[];
								for(var i=0; i< this.timeline.length;i++){
									if(this.timeline[i].static.data.type === "main"){
										

										this.timelineStat.push({stage: this.timeline[i].static.data.stage, 
											title: this.timeline[i].static.data.title,
											icon: this.timeline[i].static.data.icon, 
											completedElements:0, totalElements:0, startedElements:0,status:'todo',mainOrder: 
											this.timeline[i].static.data.mainOrder , backgroundPictureUrl:this.timeline[i].static.data.backgroundPictureUrl});

									}
								}
								for(var i=0; i< this.timeline.length;i++){
									if(this.timeline[i].static.data.type === "item"){
										const mainOrderElement = this.timeline[i].static.data.mainOrder;
										console.log("mainOrder", this.timelineStat);

										const index = this.timelineStat.findIndex(x => x.mainOrder === mainOrderElement);
										this.timelineStat[index].totalElements ++;

										if(this.timeline[i].timelineElement.data.status ==='done'){
											this.timelineStat[index].completedElements ++;
										}
										if(this.timeline[i].timelineElement.data.status ==='ongoing'){
											this.timelineStat[index].startedElements ++;
										}

										if(this.timelineStat[index].completedElements === this.timelineStat[index].totalElements){
											this.timelineStat[index].status ='done'
										}
										else if(this.timelineStat[index].completedElements > 0 || this.timelineStat[index].startedElements>0 ){
											this.timelineStat[index].status ='ongoing'
										}

									}
								}
							}

							
							console.log("SummaryPage >> initProject this.timelineStat, ", this.timelineStat)
						})
					}
				}
				else{
					this.project= new Project();
				}
			})		
	}

	saveProject(project){
		console.log("SummaryPage >>saveProject >> this.projectService.saveProject")
		this.projectService.saveProject(this.projectId,project).then(
			data=>{
				this.updateOnGoing =false;
			})
		this.modalController.dismiss();
	}


	async updateProject(){
		console.log("SummaryPage >> updateProject  >> this.projectService.saveProject")

		this.projectService.saveProject(this.projectId,this.project);
		this.lastUpdateTime = moment();
	}

	delay(ms: number) {
		return new Promise( resolve => setTimeout(resolve, ms) );
	}
	elementUpdated(ev){
		console.log("elementUpdated" , ev);
		let data =JSON.parse(ev)
		console.log(data);

		this.project.businessCanvas[data.type] = data.data;
		console.log("this.project.businessCanvas.problem",this.project.businessCanvas[data.type])
		this.saveProject(this.project);
	}
	

	addSocialNetwork(type:string){

	}
	
	async requestAddPage(type:string,mode:string){
		if(this.accessRights.write === true){
			let modal = await this.modalController.create({
				component: PopoverSocialNetworkComponent,
				cssClass: 'my-custom-class',
				componentProps: {homeref:this, type:type, project:this.project, mode:mode},
			});		
			modal.onWillDismiss().then(
				data=> this.initProject()
				)
			return await modal.present();
		}
		
	}

	dismiss(){
		this.modalController.dismiss();
	}

	timelineClicked(timelineStatElement){
		this.router.navigate(['/project/'+this.projectId+ '/details/executive/tabs/timeline']);
		this.dataSharingServiceService.currentTimelineStep(timelineStatElement.mainOrder);
	}

	async presentCommentsPopover() {
		const popover = await this.modalController.create({
			component: CommentsComponent,
			componentProps: {homeref:this, projectId:this.projectId},
		});
		return await popover.present();
	}
}
