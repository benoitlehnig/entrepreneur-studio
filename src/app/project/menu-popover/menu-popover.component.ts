import { Component, OnInit,Input} from '@angular/core';
import { NavParams} from '@ionic/angular';
import {CMSService} from '../../services/cms.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';




@Component({
	selector: 'app-menu-popover',
	templateUrl: './menu-popover.component.html',
	styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {

	@Input("homeref") value;
	public systemDParamSub: Subscription = new Subscription();
	public systemDSlackChannel:string="";

	
	constructor(
		public navParams: NavParams,
		public CMSService: CMSService,
		) { 

		
	}

	ngOnInit() {
		this.systemDParamSub = this.CMSService.getSystemDParams().pipe(first()).subscribe(
			(systemDparams:any)=>{
				this.systemDSlackChannel = systemDparams.systemDChannel;
			}) 
	}

	ngOnDestroy(){
		this.systemDParamSub.unsubscribe();
	}

	dismiss(){
		this.navParams.get('homeref').dismissMenuPopover()

	}

}
