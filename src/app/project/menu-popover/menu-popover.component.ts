import { Component, OnInit,Input} from '@angular/core';
import { NavParams} from '@ionic/angular';
import {CMSService} from '../../services/cms.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';




@Component({
	selector: 'app-menu-popover',
	templateUrl: './menu-popover.component.html',
	styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {

	@Input("homeref") value;
	@Input("project") project;
	@Input("projectId") projectId;
	public systemDParamSub: Subscription = new Subscription();
	public systemDSlackChannel:string="";

	
	constructor(
		public navParams: NavParams,
		public CMSService: CMSService,
		public router: Router,
		) { 

		
	}

	ngOnInit() {}

	ionViewWillEnter(){

		this.systemDParamSub = this.CMSService.getSystemDParams().pipe(first()).subscribe(
			(systemDparams:any)=>{
				this.systemDSlackChannel = systemDparams.systemDChannel;
			}) 
	}

	ionViewWillLeave(){
		this.systemDParamSub.unsubscribe();
	}

	dismiss(){
		this.navParams.get('homeref').dismissMenuPopover()
	}
	navigate(page){
		console.log("click", page);
		this.dismiss();
		this.router.navigate(['/project/'+this.projectId+ '/'+page]);
	}

}
