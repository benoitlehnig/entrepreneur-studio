import { Component, OnInit, Input, Output,EventEmitter,NgZone } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { PopoverBusinessCanvasElementComponent } from '../popover-business-canvas-element/popover-business-canvas-element.component';
import { ModalController } from '@ionic/angular';


@Component({
	selector: 'app-business-canvas-element',
	templateUrl: './business-canvas-element.component.html',
	styleUrls: ['./business-canvas-element.component.scss'],
})
export class BusinessCanvasElementComponent implements OnInit {

	@Input() elementData=[];
	@Input() elementType=""; 


	public title:string="";
	public placeholder:string="";
	public editedItemId=null;
	public newItem = {display:false,text:""};

	@Output()
	changed = new EventEmitter<string>();


	constructor(
		public translateService : TranslateService,
		public modalController : ModalController,

		) { 

	}


	ngOnInit() {
		console.log("ngOnInit BusinessCanvasElementComponent", this.elementType)
		this.translateService.get(['PROJECT_SUMMARY.BusinessCanvas'+this.elementType, 'PROJECT_SUMMARY.BusinessCanvas'+this.elementType+'Placeholder']).subscribe(
			value => {
				this.title = value['PROJECT_SUMMARY.BusinessCanvas'+this.elementType]
				this.placeholder = value['PROJECT_SUMMARY.BusinessCanvas'+this.elementType+'Placeholder'];
			});
	}

	ngOnDestroy (){
		console.log("ngOnDestroy >> ngOnDestroy", this.elementType);
		this.newItem.display= false;
		this.elementData=[];
	}

	requestAddItem(){
		console.log("requestAddItem");
		this.newItem.display= true;
		console.log(this.newItem.display);
	}
	addItem(){
		console.log("this.elementData", this.elementData);
		if(this.newItem.display ===true && this.newItem.text !==''){
			if(this.elementData){
				this.elementData.push({id:this.elementData.length,'text':this.newItem.text });
			}
			else{
				this.elementData= [{id:0,'text':this.newItem.text }];
			}
			this.newItem.display= false;
			
			let elementType = this.elementType[0].toLowerCase()+ this.elementType.slice(1); 
			this.changed.emit(JSON.stringify({data:this.elementData, type:elementType}) );
			this.newItem.text= "";

		}
		if( this.newItem.text ===''){
			this.newItem.display= false;

		}

	}

	async openPopover(item){
		let modal = await this.modalController.create({
			component: PopoverBusinessCanvasElementComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:this.elementType, item:item},
		});
		return await modal.present();

	}
	edit(itemId){
		this.editedItemId = itemId
	}
	saveItem(){
		let elementType = this.elementType[0].toLowerCase()+ this.elementType.slice(1); 
		this.changed.emit(JSON.stringify({data:this.elementData, type:elementType}) );
		this.editedItemId= null;
	}


}
