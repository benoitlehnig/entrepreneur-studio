import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import {Resource} from '../../../models/project';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import { first } from 'rxjs/operators';
import {ProjectService} from '../../../services/project.service';
import { ModalController } from '@ionic/angular';
import {ResourcePopoverComponent} from './resource-popover/resource-popover.component'

@Component({
	selector: 'app-resources',
	templateUrl: './resources.page.html',
	styleUrls: ['./resources.page.scss'],
})



export class ResourcesPage implements OnInit {


	constructor(
		private http: HttpClient,
		private functions: AngularFireFunctions,
		public dataSharingServiceService: DataSharingServiceService,
		public projectService: ProjectService,
		public modalController: ModalController,


		) { }

	public projectId:string="";
	public resources=[];
	public accessRights={read: false, write:false};

	

	ngOnInit() {
		this.initResources()
	}




	initResources(){
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{
				console.log("initResources",data)
				if(data !==null){
					this.projectId	= data.id;
					this.accessRights = data.accessRights;
					this.projectService.getResources(this.projectId).subscribe(
						resources=>{
							console.log("resources", resources);
							if(resources !==null){
								this.resources = resources.sort((n1,n2) => n1.data.order - n2.data.order);
							}


						})
				}
			})		
	}

	updateResource(resource){
		if(resource.data.url !=="")
		{
			if(resource.id){
				this.projectService.updateResource(this.projectId,resource.data);
			}
			else{

				resource.data.order = this.resources.length+1
				this.projectService.addResource(this.projectId,resource);

			}
		}

	}
	getMetaData(){
		for(let i =0;i< this.resources.length;i++){
			let resource = new Resource();
			resource.url = this.resources[i].url;
			const callable = this.functions.httpsCallable('getMetadata');
			const obs = callable({url:  resource.url });
			obs.pipe(first()).subscribe(async res => {
				let metadata = JSON.parse(res);
				console.log("metadata",JSON.parse(res));
				this.resources[i].pictureUrl = metadata.image;
				this.resources[i].source = metadata.source;
				this.resources[i].title = metadata.title;
			});

		}
	}


	public requestAddNewResource(){
		let resource = {id:null,data:new Resource()};
		this.presentResourcePopoverComponent(resource);
	}
	public requestUpdateResource(event){
		console.log("resourceDelet", event);
		let resource =JSON.parse(event)
		this.presentResourcePopoverComponent(resource);
	}
	
	public deleteResource(resourceId){
		this.projectService.deleteResource(this.projectId,resourceId);
	}


	resourceUpdated(event){
		console.log("resourceUpdated", event);
		let resource =JSON.parse(event)
		this.updateResource(resource);
	}
	resourceDeleted(event){
		console.log("resourceDelet", event);
		let resource =JSON.parse(event)
		if(resource.id !==null){
			this.projectService.deleteResource(this.projectId,resource.id);
		}

	}

	dismiss(){
		this.modalController.dismiss();
	}
	async presentResourcePopoverComponent(resource) {

		const popover = await this.modalController.create({
			component: ResourcePopoverComponent,
			cssClass: 'popover',
			componentProps: {homeref:this, resource:resource},

		});
		return await popover.present();
	}
}
