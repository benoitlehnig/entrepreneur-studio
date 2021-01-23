import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-share-popover',
	templateUrl: './share-popover.component.html',
	styleUrls: ['./share-popover.component.scss'],
})
export class SharePopoverComponent implements OnInit {

	@Input("tool") tool;
	@Input("homeref") value;
	@Input("fullSCreen") fullSCreen;

	constructor(
		public navParams: NavParams,
		) { }


	ngOnInit() {}

	dismiss(){
		if(this.fullSCreen ===true){
			this.navParams.get('homeref').dismissOpenShareModal()
			
		}
		else{
			this.navParams.get('homeref').dismissOpenSharePopover()
		}
		
	}
}
