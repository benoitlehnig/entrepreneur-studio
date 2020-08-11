import { Component, OnInit,Input } from '@angular/core';
import {DataSharingServiceService} from '../../../../services/data-sharing-service.service';
import {Project} from '../../../../models/project';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-popover-project-summary',
	templateUrl: './popover-project-summary.component.html',
	styleUrls: ['./popover-project-summary.component.scss'],
})
export class PopoverProjectSummaryComponent implements OnInit {

	public project:Project = new Project();
	@Input("homeref") value;

	constructor(
		public dataSharingServiceService: DataSharingServiceService,
		public navParams : NavParams,

		) { }

	ngOnInit() {
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
