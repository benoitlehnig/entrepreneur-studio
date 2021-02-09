import { Component, OnInit,Input } from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import { NavParams} from '@ionic/angular';

import { Subscription } from 'rxjs';
import * as moment from 'moment';



@Component({
	selector: 'app-skill-searches-popover',
	templateUrl: './skill-searches-popover.component.html',
	styleUrls: ['./skill-searches-popover.component.scss'],
})
export class SkillSearchesPopoverComponent implements OnInit {

	@Input("homeref") value;
	@Input("projectId") projectId;

	public skillSearches =[]
	public skillSearchersSub: Subscription = new Subscription();

	public tooltipOptions={
		'show-delay': 500,
		'max-width' : 350
	}

	constructor(
		public projectService:ProjectService,
		public navParams : NavParams,

		) { 
	}

	ngOnInit() {
		this.skillSearchersSub = this.projectService.getSkillSearchers(this.projectId).subscribe(
			skillSearches =>{
				console.log("getSkillSearchers", skillSearches);
				this.skillSearches = skillSearches;
			})
	}

	
	ngOnDestroy(){
		
		this.skillSearchersSub.unsubscribe();
	}

	deleteSkillSearch(skillSearchId){
		this.projectService.deleteSkillSearch(this.projectId,skillSearchId);
	}

	dismiss(){
		this.navParams.get('homeref').dismissSkillSearchesPopover();
	}
	requestFindSkills(){
		this.dismiss();
		this.navParams.get('homeref').requestFindSkills();
	}
	getTooltip(responses){ 
		let returnedTooltipText = "";
		for(let i =0;i<responses.length;i++){
			returnedTooltipText=returnedTooltipText+"<p>"+responses[i].data.user.name+" - " +moment(responses[i].data.creationDate).format("DD/MM/YYYY hh:mm:ss")+ "</p>";
		}
		return returnedTooltipText;
	}

}
