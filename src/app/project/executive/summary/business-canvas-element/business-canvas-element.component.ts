import { Component, OnInit, Input, Output,EventEmitter,NgZone } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { PopoverBusinessCanvasElementComponent } from '../popover-business-canvas-element/popover-business-canvas-element.component';
import { ModalController } from '@ionic/angular';
import { PopoverBusinessCanvasComponent } from '../popover-business-canvas/popover-business-canvas.component';


@Component({
	selector: 'app-business-canvas-element',
	templateUrl: './business-canvas-element.component.html',
	styleUrls: ['./business-canvas-element.component.scss'],
})
export class BusinessCanvasElementComponent implements OnInit {

	@Input() elementData=[];
	@Input() elementType=""; 
	@Input() elementStyle=""; 
	@Input() accessRights ={read: false, write:false};

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
		console.log("ngOnInit BusinessCanvasElementComponent", this.elementType, this.		elementData, this.elementData.length)
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
				this.elementData.push({id:this.randomId(),'text':this.newItem.text });
			}
			else{
				this.elementData= [{id: this.randomId(),'text':this.newItem.text }];
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
	randomId(): string {
		const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
		return uint32.toString(16);
	}

	async openPopover(item,index){
		let indexToBeDisplayed = Number(index) +1;
		 

		let modal = await this.modalController.create({
			component: PopoverBusinessCanvasElementComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:this.elementType, item:item, title:this.title,index:indexToBeDisplayed},
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
	updateItem(item){
		console.log(item);
		this.elementData[item.id] = item;
		this.saveItem();
		this.modalController.dismiss();
	}
	deleteItem(item){
		console.log("deleteItem >>", item);
		const index =  this.elementData.findIndex(x => x.id=== item.id);
		console.log(index);
		if (index > -1) {
			this.elementData.splice(index, 1);
		}
		this.saveItem();
		this.modalController.dismiss();
	}


	async openDescriptivePopover(){
		let modal = await this.modalController.create({
			component: PopoverBusinessCanvasComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:this.elementType},
		});
		return await modal.present();

	}
	dismiss(){
		this.modalController.dismiss();
	}

}
