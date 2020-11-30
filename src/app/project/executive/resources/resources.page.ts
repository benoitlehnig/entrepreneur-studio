import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import {Resource} from '../../../models/project';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import { first } from 'rxjs/operators';
import {ProjectService} from '../../../services/project.service';

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

		) { }

	public projectId:string="";
	public resources=[];
	
	ngOnInit() {
		this.initResources()
	}

	initResources(){
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=>{
				console.log("initResources",data)
				if(data !==null){
					this.projectId	= data.id;
					this.projectService.getResources(this.projectId).subscribe(
						resources=>{
							console.log("resources", resources);
							if(resources !==null){
								this.resources = resources;
							}


						})
				}
			})		
	}

	updateResource(resource){
		const callable = this.functions.httpsCallable('getMetadata');
		const obs = callable({url:  resource.data.url });
		console.log("updateResource", resource);
		if(resource.data.url !=="")
		{
			if(resource.id){
				obs.pipe(first()).subscribe(async res => {
					try {
						console.log("resobs", res)
						let metadata = JSON.parse(res);
						console.log("metadata",JSON.parse(res));
						resource.data.pictureUrl = metadata.image;
						resource.data.source = metadata.source;
						resource.data.title = metadata.title;
					}catch (error) {
						console.error('Here is the error message', error);
					}
					this.projectService.updateResource(this.projectId,resource.data);
				});
			}
			else{

				obs.pipe(first()).subscribe(async res => {
					try {
						let metadata = JSON.parse(res);
						console.log("metadata",JSON.parse(res));
						resource.data.pictureUrl = metadata.image;
						resource.data.source = metadata.source;
						resource.data.title = metadata.title;
					}catch (error) {
						console.error('Here is the error message', error);
					}
					this.projectService.addResource(this.projectId,resource);
				});

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
	public retrieveMetadata(url){
		const callable = this.functions.httpsCallable('getMetadata');
		const obs = callable({url:  url});
		return obs.subscribe(async res => {
			console.log("res",res)
			return res;
		});
	};

	public requestAddNewResource(){
		let resource = {id:null,data:new Resource()};
		this.resources.push(resource);
	}
	public deleteResource(resourceId){
		this.projectService.deleteResource(this.projectId,resourceId);
	}

	public saveResources(){
		//this.project.
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
}
