import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-popover-business-canvas-element',
	templateUrl: './popover-business-canvas-element.component.html',
	styleUrls: ['./popover-business-canvas-element.component.scss'],
})
export class PopoverBusinessCanvasElementComponent implements OnInit {

	@Input() type; 
	@Input() item; 
	@Input("homeref") homeref;

	@Output()
	changed = new EventEmitter<string>();

	public title="";
	public placeholder="";

	constructor(
		public translateService : TranslateService,
		public navParams : NavParams,

		) { 

	}

	ngOnInit() {
		console.log("ngOnInit BusinessCanvasElementComponent", this.type)
		this.translateService.get(['PROJECT_SUMMARY.BusinessCanvas'+this.type, 'PROJECT_SUMMARY.BusinessCanvas'+this.type+'Placeholder']).subscribe(
			value => {
				this.title = value['PROJECT_SUMMARY.BusinessCanvas'+this.type]
				this.placeholder = value['PROJECT_SUMMARY.BusinessCanvas'+this.type+'Placeholder'];

			})

	}

	saveItem(){
		console.log("saveItem", this.item);
		this.navParams.get('homeref').updateItem(this.item);
	}

	deleteItem(){
		this.navParams.get('homeref').deleteItem(this.item);
	}

}
