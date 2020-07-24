import { Component, OnInit } from '@angular/core';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-project',
	templateUrl: './project.page.html',
	styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

	public project:Project= new Project();
	constructor(
		public projectService:ProjectService,
		private activatedRoute: ActivatedRoute,

		) { }

	public selectedIndex = 0;

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
		let projectId = this.activatedRoute.snapshot.paramMap.get('id');

		this.projectService.getProject(projectId).subscribe(
			(data)=>{
				console.log(data);
				this.project= data;
			})
	}
	selectTabNavigation(){
    const path = window.location.pathname;
    if (path !== undefined) {
      this.selectedIndex = this.pages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().split("/")[1]);
    }
  }


}
