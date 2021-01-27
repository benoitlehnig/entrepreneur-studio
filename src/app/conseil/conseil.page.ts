import { Component, OnInit } from '@angular/core';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import {AuthService} from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { PopoverFeedbackComponent } from '../project/executive/summary/popover-feedback/popover-feedback.component';
import { Subscription } from 'rxjs';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import * as moment from 'moment';

import { first } from 'rxjs/operators';

@Component({
	selector: 'app-conseil',
	templateUrl: './conseil.page.html',
	styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {

	public userIds:any;
	public projects;
	public uidChangesSub: Subscription = new Subscription();
	public userChangesSub: Subscription = new Subscription();
	public projectsDetailsbyUidSub: Subscription = new Subscription();

	constructor(
		public projectService:ProjectService,
		public authService:AuthService,
		public dataSharingServiceService:DataSharingServiceService,
		private modalController : ModalController,
		) { }

	ngOnInit() {
		console.log("ConseilPage >> ngOnInit " );

		this.uidChangesSub = this.dataSharingServiceService.getUidChanges().subscribe(
			userIds=>{
				if(userIds){
					console.log("ConseilPage ngOnInit this.userIds", userIds);
					this.userIds =userIds;
					console.log("this.authService.getClaims()",this.authService.getClaims());
				}
			});
		this.userChangesSub = this.dataSharingServiceService.getUserChanges().subscribe(
			user=>{
				if(user){
					console.log("ConseilPage ngOnInit user ",user  );
					this.projectsDetailsbyUidSub = this.projectService.getProjectsDetailsbyUid(this.userIds.uid).subscribe(
						(data)=>{
							if(data){
								console.log("getProjectsDetailsbyUid data", data)
								this.projects = data;
								this.projects = this.projects.sort((a, b) => {
									return moment(a.data.lastUpdateDateTime).unix()- moment(b.data.lastUpdateDateTime).unix();;
								});
								console.log("getProjectsDetailsbyUid data after sort", data)
							}
						});
				}
			});
	}



	async openFeedbackPopover(type:string){
		let modal = await this.modalController.create({
			component: PopoverFeedbackComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:type },
		});

		return await modal.present();

	}

	dismiss(){
		this.modalController.dismiss();
	}

	ngOnDestroy(){
		this.uidChangesSub.unsubscribe();
		this.userChangesSub.unsubscribe();
		this.projectsDetailsbyUidSub.unsubscribe();
	}

	


}
