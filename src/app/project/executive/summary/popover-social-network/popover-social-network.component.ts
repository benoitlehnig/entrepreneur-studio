import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import {SocialNetworks} from '../../../../models/project';

@Component({
	selector: 'app-popover-social-network',
	templateUrl: './popover-social-network.component.html',
	styleUrls: ['./popover-social-network.component.scss'],
})
export class PopoverSocialNetworkComponent implements OnInit {

	@Input("homeref") value;
	@Input("project") project;
	@Input("type") type;
	@Input("mode") mode;

	public link:string=""

	constructor(
		public navParams : NavParams,

		) { }

	ngOnInit() {
		if(this.mode ==='update'){
			if(this.project.summary.socialNetworks === undefined){
				this.project.summary.socialNetworks = new SocialNetworks()
			}
			this.link = this.project.summary.socialNetworks[this.type].link ;
		}

		
	}

	save(){
		this.project.summary.socialNetworks[this.type] = {link: this.link}
		console.log("PopoverSocialNetworkComponent",this.project)
		
		this.navParams.get('homeref').saveProject(this.project);
	}

	dismiss(){
		this.navParams.get('homeref').dismiss();
	}


}
