import { Component, OnInit } from '@angular/core';
import {Tool} from '../../../models/tool';
import {ToolService} from '../../../services/tool.service';
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';





@Component({
	selector: 'app-tool',
	templateUrl: './tool.page.html',
	styleUrls: ['./tool.page.scss'],
})
export class ToolPage implements OnInit {

	public tool: Tool = new Tool();
	public toolId:string=""
	public labels=[];
	public categories = [];
	public stages = [];

	public mode="update";

	public categoriesChangesSub: Subscription = new Subscription();
	public toolsChangesSub: Subscription = new Subscription();


	constructor(
		public toolService: ToolService,
		private activatedRoute: ActivatedRoute,
		public router:Router,
		public translateService : TranslateService,
		public alertController : AlertController,

		) { }

	ngOnInit() {

	}
	ionViewWillEnter(){
		let mode = this.activatedRoute.snapshot.paramMap.get('mode');
		if(mode ==='add'){
			this.mode = "add";
		}
		else{
			this.toolId = this.activatedRoute.snapshot.paramMap.get('id');
			this.toolsChangesSub = this.toolService.getTool(this.toolId).subscribe(data=>{
				console.log("getTools",data);
				this.tool= data;
			})
		}
		this.categoriesChangesSub = this.toolService.getCategories().subscribe(
			data =>{
				console.log("categories", data)
				this.categories = data;
			}
		);
		
		
		this.translateService.get('TOOLS.STAGES').subscribe(
			data=>{
				console.log("STAGES" , data);
				let arr=[];
				Object.keys(data).map(function(key){  
					arr.push({id: key, name:data[key]})  
					return arr;  
				}); 
				this.stages = arr;
			})
	}
	ngOnDestroy(){
		this.toolsChangesSub.unsubscribe();
		this.categoriesChangesSub.unsubscribe();
	}

	save(){
		console.log("save" , this.tool);
		for (let label in this.tool.labels) {
			if(this.tool.labels[label]){
				this.tool.labels[label] = label;

			}
			else{
				delete  this.tool.labels[label]
			}
		}
		for (let stage in this.tool.stages) {
			if(this.tool.stages[stage]){
				this.tool.stages[stage] = stage;

			}
			else{
				delete  this.tool.stages[stage]
			}
			this.tool.stages[stage] = stage;
		}
		if(this.mode ==='update'){
			this.toolService.save(this.toolId,this.tool)
		}
		else{

			this.toolService.add(JSON.parse(JSON.stringify(this.tool)));
			this.router.navigate(['/admin/tools']);
		}

	}
	delete(){
		this.toolService.delete(this.toolId);
		this.router.navigate(['/admin/tools']);

	}
	async requestDelete(){
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Supprimer '+this.tool.name,
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: (blah) => {
					console.log('Confirm Cancel: blah');
				}
			}, {
				text: 'Okay',
				handler: () => {
					this.delete()
				}
			}
			]		});

		await alert.present();
	}

}
