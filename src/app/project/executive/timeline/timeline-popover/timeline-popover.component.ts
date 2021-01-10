import { Component, OnInit ,Input} from '@angular/core';
import { NavParams} from '@ionic/angular';




@Component({
	selector: 'app-timeline-popover',
	templateUrl: './timeline-popover.component.html',
	styleUrls: ['./timeline-popover.component.scss'],
})
export class TimelinePopoverComponent implements OnInit {

	@Input('timelineElement') timelineElement;
	@Input("homeref") value;
	@Input("projectId") projectId;
	@Input("tools") tools;
	@Input("delivrable") delivrable;
	@Input("accessRights") accessRights ={read: false, write:false};

	constructor(
		public navParams: NavParams,
		) { }

	ngOnInit() {
		console.log("TimelinePopoverComponent >> delivrableList", this.delivrable);
		console.log("TimelinePopoverComponent >> tools", this.tools);
	}


	saveTimelineElement(){
		this.navParams.get('homeref').saveTimelineElement();
	}
	dismiss(){
		this.navParams.get('homeref').dismiss()
	}

}
