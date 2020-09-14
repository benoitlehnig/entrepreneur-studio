import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Tool} from '../../models/tool';
import {ToolService} from '../../services/tool.service';


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


	constructor(
		public modalController: ModalController,
		public toolService: ToolService,
		) { }

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.toolService.getTools().subscribe(data=>{
			console.log(data);
			this.tools= data;
		})
	}

	requestAddTool(){
		console.log("requestAddTool");
		this.openPopover();
	}

	async openPopover(){
		let modal = await this.modalController.create({
			component: AddToolPopoverPage,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this},
		});
		
		return await modal.present();

	}

	addTool(tool){
		this.toolService.addTool(tool);
		this.modalController.dismiss();
	}

}
