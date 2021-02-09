import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { IonSlides } from '@ionic/angular';
import {ProjectService} from '../../../../services/project.service';
import {SkillSearch} from '../../../../models/project';


@Component({
	selector: 'app-find-skills-popover',
	templateUrl: './find-skills-popover.component.html',
	styleUrls: ['./find-skills-popover.component.scss'],
})
export class FindSkillsPopoverComponent implements OnInit {

	public profileTypeSearched:string ="";
	public projectProfilesItems:Array<any>=[];
	public skillSearch:SkillSearch =new SkillSearch();
	@Input("projectId") projectId;

	constructor(
		public navParams : NavParams,
		public translateService : TranslateService,
		public projectService:ProjectService,


		) { }

	ngOnInit() {

		this.translateService.get('TEAM.ProjectProfiles').pipe(first()).subscribe(
			value => {
				if(value){
					this.projectProfilesItems = this.returnArrary(value);
				}
			})
	}

	dismiss(){
		this.navParams.get('homeref').dismissFindSkillsPopover();
	}

	returnArrary(input){
		let arr=[];
		Object.keys(input).map(function(key){  
			arr.push({index: key, text:input[key]})  
			return arr;  
		});
		return arr 
	}
	updateSkillSearch(index,ev){
		let i = this.skillSearch.skills.indexOf(index);
		if(ev.detail.checked===true){
			if(i ===-1){
				this.skillSearch.skills.push(index);
			}
		}
		else{
			if(i !==-1){
				this.skillSearch.skills.splice(i,1);
			}
		}
		
	}

	selectProfileType(profileType){

		//this.slides.updateAutoHeight();
		this.skillSearch.type = profileType;
	}

	saveSkillSearch(){
		this.projectService.saveSkillSearch(this.projectId, this.skillSearch);
		this.dismiss();

	}

}
