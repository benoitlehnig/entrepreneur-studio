import { Component, OnInit,Input } from '@angular/core';
import {DataSharingServiceService} from '../../../../services/data-sharing-service.service';
import {Project} from '../../../../models/project';
import { NavParams} from '@ionic/angular';



@Component({
	selector: 'app-popover-business-canvas',
	templateUrl: './popover-business-canvas.component.html',
	styleUrls: ['./popover-business-canvas.component.scss'],
})
export class PopoverBusinessCanvasComponent implements OnInit {

	public project:Project = new Project();


	@Input("homeref") value;
	@Input("type") type;

	
	constructor(
		public dataSharingServiceService: DataSharingServiceService,
		public navParams : NavParams,
		) { 

		
	}



	ngOnInit() {
		console.log("type", this.type)
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
