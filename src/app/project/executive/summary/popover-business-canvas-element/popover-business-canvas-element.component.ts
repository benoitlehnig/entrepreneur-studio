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
	@Input() title; 
	@Input() item; 
	@Input() index; 
	@Input("homeref") homeref;

	@Output()
	changed = new EventEmitter<string>();



	constructor(
		public translateService : TranslateService,
		public navParams : NavParams,

		) { 

	}

	ngOnInit() {
	

	}

	saveItem(){
		console.log("saveItem", this.item);
		this.navParams.get('homeref').updateItem(this.item);
	}

	deleteItem(){
		this.navParams.get('homeref').deleteItem(this.item);
	}

	dismiss(){
		this.navParams.get('homeref').dismiss();

	}

}
