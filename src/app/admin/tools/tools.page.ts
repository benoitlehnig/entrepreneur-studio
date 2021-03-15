import { Component, OnInit, Input } from '@angular/core';
import {Tool} from '../../models/tool';
import {ToolService} from '../../services/tool.service';
import { Subscription } from 'rxjs';

import {AddToolPopoverPage} from './tool/add-tool-popover/add-tool-popover.page'

@Component({
	selector: 'app-tools',
	templateUrl: './tools.page.html',
	styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {

	tools:Array<Tool>=[];
	@Input("homeref") value;

	items = [
	{id: 1, name: 'Python'},
	{id: 2, name: 'Node Js'},
	{id: 3, name: 'Java'},
	{id: 4, name: 'PHP', disabled: true},
	{id: 5, name: 'Django'},
	{id: 6, name: 'Angular'},
	{id: 7, name: 'Vue'},
	{id: 8, name: 'ReactJs'},
	];
	selected = [
	{id: 2, name: 'Node Js'},
	{id: 8, name: 'ReactJs'}
	];
	
	public toolsChangesSub: Subscription = new Subscription();


	constructor(
		public toolService: ToolService,
		) { }

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.toolsChangesSub = this.toolService.getTools().subscribe(data=>{
			console.log("getTools",data);
			this.tools= data;
		})
	}

	ngOnDestroy(){
		this.toolsChangesSub.unsubscribe();
	}

	

	

}
