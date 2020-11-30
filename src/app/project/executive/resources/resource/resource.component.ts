import { Component, OnInit , Input,Output,EventEmitter} from '@angular/core';
import {Resource} from '../../../../models/project';
import {AppConstants} from '../../../../app-constants'



@Component({
	selector: 'app-resource',
	templateUrl: './resource.component.html',
	styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent implements OnInit {

	@Input() resource;
	@Output()
	changed = new EventEmitter<string>();
	@Output()
	deleted = new EventEmitter<string>();

	public inEdition:boolean = false;
	public isMouseOvered:boolean = false;
	public applicationFavicons= this.appConstants.applicationFavicons;
	constructor(
		public appConstants:AppConstants
		) 
	{ 
		this.resource = {id:"", data: new Resource()}
	}

	ngOnInit() {
		console.log("ngOnInit", this.resource);
		if(this.resource.data.pictureUrl === null || this.resource.data.pictureUrl ===""){
			this.resource.data.pictureUrl = this.applicationFavicons[this.resource.data.source];
		}
		

	}

	updateResource(){
		this.changed.emit(JSON.stringify(this.resource));
		this.inEdition = false;

	}
	requestEdition(){
		this.inEdition = true;
	}

	deleteResource(){
		this.inEdition = false;

		this.deleted.emit(JSON.stringify(this.resource));

	}

}
