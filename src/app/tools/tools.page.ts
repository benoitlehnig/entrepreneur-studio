import { Component, OnInit } from '@angular/core';
import { CMSService} from '../services/cms.service';
import {TranslateService} from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-tools',
	templateUrl: './tools.page.html',
	styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {

	public tools;


	items = [];
	filter={
		categories : [],
		stages:[],
		productName:""
	}
	stages = []


	constructor(
		public CMSService:CMSService,
		public translateService : TranslateService,

		)
	{
		console.log("tools" );
	}

	ngOnInit() {
		this.CMSService.retrieveToolsContent(this.filter).pipe(first()).subscribe(
			data=>{
				console.log("CMSService", data)
				this.tools = data;
			})
		this.translateService.get('TOOLS.CATEGORIES').subscribe(
			data=>{
				let arr=[];
				Object.keys(data).map(function(key){  
						arr.push({id: key, name:data[key]})  
						return arr;  
					}); 
				this.items = arr;
			})
		this.translateService.get('TOOLS.STAGES').subscribe(
			data=>{
				console.log("STAGES" , data);
				let arr=[];
				Object.keys(data).map(function(key){  
						arr.push({id: key, name:data[key]})  
						return arr;  
					}); 
				this.stages = arr;
				console.log(this.stages)
			})
	}
	updateList(){
		console.log(this.filter.categories);
		this.CMSService.retrieveToolsContent(this.filter).subscribe(
			data=>{
				console.log("CMSService", data)
				this.tools = data;
			})
	}

}
