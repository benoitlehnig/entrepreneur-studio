import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {


	public projectChangesSub: Subscription = new Subscription();
	public projects=[];
  constructor(
  	public projectService:ProjectService) { }

  ngOnInit() {

  	this.projectChangesSub = this.projectService.getProjects().subscribe(
  		data=>{
  			console.log("projects", data);
  			this.projects = data;
  		})
  }

  deleteProject(id){
  	this.projectService.deleteProject(id);
  }

}
