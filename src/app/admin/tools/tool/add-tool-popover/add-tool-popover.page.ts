import { Component, OnInit } from '@angular/core';
import {Tool} from '../../../../models/tool';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-add-tool-popover',
	templateUrl: './add-tool-popover.page.html',
	styleUrls: ['./add-tool-popover.page.scss'],
})
export class AddToolPopoverPage implements OnInit {

	public tool:Tool = new Tool();
	public labels="";

	constructor(
		public navParams:NavParams,
		) { }

	ngOnInit() {
	}
	onChange(val){
		console.log(this.labels)
	}

	
}