import { Component, OnInit,Input } from '@angular/core';
import {DataSharingServiceService} from '../../../../services/data-sharing-service.service';
import {Project} from '../../../../models/project';
import { NavParams} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

import {AppConstants} from '../../../../app-constants'

@Component({
	selector: 'app-popover-business-canvas',
	templateUrl: './popover-business-canvas.component.html',
	styleUrls: ['./popover-business-canvas.component.scss'],
})
export class PopoverBusinessCanvasComponent implements OnInit {

	public project:Project = new Project();

	public static= this.appConstants.businessCanvasStatic;
	public topPart = {img:"",title:"",subTitle:"", guidance:"",example:""}
	@Input("homeref") value;
	@Input("type") type;




	constructor(
		public dataSharingServiceService: DataSharingServiceService,
		public navParams : NavParams,
		private appConstants: AppConstants,
		public translateService : TranslateService,

		) { 

	}


	ngOnInit() {
		console.log("type", this.type);
		let topPartTranslate = this.appConstants.businessCanvasStatic[this.type];
		this.topPart.img= this.appConstants.businessCanvasStatic[this.type].img;
		console.log(topPartTranslate);
		this.translateService.get(['PROJECT_SUMMARY.'+topPartTranslate.title,'PROJECT_SUMMARY.'+topPartTranslate.subTitle,
			'PROJECT_SUMMARY.'+topPartTranslate.guidance,'PROJECT_SUMMARY.'+topPartTranslate.example]).subscribe(
			value => {
				this.topPart.title = value['PROJECT_SUMMARY.'+topPartTranslate.title];
				this.topPart.subTitle = value['PROJECT_SUMMARY.'+topPartTranslate.subTitle];
				this.topPart.guidance = value['PROJECT_SUMMARY.'+topPartTranslate.guidance];
				this.topPart.example = value['PROJECT_SUMMARY.'+topPartTranslate.example];
				
			});	
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=> {
				if(data){
					this.project = data.data;
				}
			});

	}

	save(){
		this.navParams.get('homeref').saveProject(this.project);
	}

	

}
