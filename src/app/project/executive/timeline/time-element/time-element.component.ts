import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
	selector: 'app-time-element',
	templateUrl: './time-element.component.html',
	styleUrls: ['./time-element.component.scss'],
})
export class TimeElementComponent implements OnInit {


	constructor() { }

	@Input('element') element;
	@Input('index') index;
	@Input('selected') selectedStatus;
	@Input('forecastedStartDate') forecastedStartDate;

	public isTitle:boolean = false;
	@Output()
	selected = new EventEmitter<string>();

	ngOnInit() {

		if(this.element){
			if(this.element.static.data.type ==='main'){
				this.isTitle = true;
			}
		}


	}

	select(){
		this.selected.emit(JSON.stringify(this.element));
	}

}
