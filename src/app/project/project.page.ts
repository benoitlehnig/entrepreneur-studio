import { Component, OnInit } from '@angular/core';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
	selector: 'app-project',
	templateUrl: './project.page.html',
	styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

	public project:Project= new Project();
	public projectId:string="";


	constructor(
		public projectService:ProjectService,
		private activatedRoute: ActivatedRoute,
		public dataSharingServiceService:DataSharingServiceService,
		public authService:AuthService,
		public router:Router,
		private menu: MenuController
		) {
		this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
		this.authService.getUserDetails().subscribe(
			data=>{
				if(data){
					console.log("getUserDetails", data);
					this.projectService.getProjectbyOwnerUid(data.uid).subscribe(
						(data)=>{
							console.log(data);
							this.projects = data
						});
				}
			});
		this.initProject();
	}

	public selectedIndex = 0;
	public projects=[];

	public pages = [

	{
		title: 'Executive',
		url: 'executive',
		icon: 'person'
	},
	{
		title: 'Ideation',
		url: 'ideation',
		icon: 'shield-checkmark'
	},
	{
		title: 'Creation',
		url: 'creation',
		icon: 'people-circle'
	}
	];


	ngOnInit() {
		console.log("ProjectPage ngOnInit" )
		this.initProject();
		
	}

	initProject(){
		this.projectService.getProject(this.projectId).subscribe(
			(data)=>{
				if(data){
					console.log("projectService.getProject" , data);
					this.project= data;
					this.dataSharingServiceService.currentProject({id:this.projectId, data: data});
				}
				
			})
	}

	selectTabNavigation(){
		const path = window.location.pathname;
		if (path !== undefined) {
			this.selectedIndex = this.pages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().split("/")[1]);
		}
	}

	changeProject(event){
		console.log(event.target.value);
		this.router.navigate(['project/'+event.target.value]);
	}	

	hideMenu(){
		console.log("hideMenu")
		
		this.menu.toggle();

	}


}
