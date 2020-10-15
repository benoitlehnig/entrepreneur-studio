import { Component, OnInit } from '@angular/core';
import { CMSService} from '../services/cms.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-tools',
	templateUrl: './tools.page.html',
	styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {

	public tools;


	items = [];
	filter={
		categories : []
	}


	constructor(
		public CMSService:CMSService,
		public translateService : TranslateService,

		)
	{
		console.log("tools" );
	}

	ngOnInit() {
		this.CMSService.retrieveToolsContent(this.filter).subscribe(
			data=>{
				console.log("CMSService", data)
				this.tools = data;
			})
		this.translateService.get('TOOLS.CATEGORIES').subscribe(
			data=>{
				console.log("categories" , data);
				let arr=[];
				Object.keys(data).map(function(key){  
						arr.push({id: key, name:data[key]})  
						return arr;  
					}); 
				this.items = arr;
				console.log(this.items)
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
