import { Component, OnInit,Input } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-sharing-status-popover',
	templateUrl: './sharing-status-popover.component.html',
	styleUrls: ['./sharing-status-popover.component.scss'],
})
export class SharingStatusPopoverComponent implements OnInit {

	@Input("projectId") projectId;
	@Input("homeref") value;

	constructor(
		public projectService:ProjectService,
		public navParams: NavParams,

		) { }

	ngOnInit() {}

	updateSharingStatus(status){
		this.projectService.setSharingStatus(this.projectId, status);
		this.navParams.get('homeref').updateStatus(status);
	}

}
