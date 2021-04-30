import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';




import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {ConseilService} from '../services/conseil.service';


import {DataSharingServiceService} from '../services/data-sharing-service.service';
import {AuthService} from '../services/auth.service';
import { PopoverFeedbackComponent } from '../project/executive/summary/popover-feedback/popover-feedback.component';




@Component({
	selector: 'app-conseil',
	templateUrl: './conseil.page.html',
	styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {

	public userIds:any;
	public projects=[];
	public uidChangesSub: Subscription = new Subscription();
	public userChangesSub: Subscription = new Subscription();
	public projectsDetailsbyUidSub: Subscription = new Subscription();
	public conseilChangesSub: Subscription = new Subscription();


	public isConseilReferenced:boolean=false;
	public referencingNotActiveText:string="";

	constructor(
		public projectService:ProjectService,
		public authService:AuthService,
		public conseilService:ConseilService,
		public dataSharingServiceService:DataSharingServiceService,
		private modalController : ModalController,
		public toastController: ToastController,
		public translateService : TranslateService,
		public router:Router,


		) { }

	ngOnInit() {}
	ionViewWillEnter(){

		this.uidChangesSub = this.dataSharingServiceService.getUidChanges().subscribe(
			userIds=>{
				if(userIds !==null &&  userIds !==-1){
					console.log("ConseilPage ngOnInit this.userIds", userIds);
					this.userIds =userIds;
					console.log("this.authService.getClaims()",this.authService.getClaims());
				}
			});
		this.userChangesSub = this.dataSharingServiceService.getUserChanges().subscribe(
			user=>{
				if(user){
					if(user.conseilCMSID !== undefined ){
						this.conseilChangesSub = this.conseilService.getConseil(user.conseilCMSID).subscribe(conseilData=>{
							if(conseilData.isPublic === true){
								this.isConseilReferenced = true;

							}
							else{
								this.presentToast();
							}

						});
					}
					
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

		this.translateService.get('CONSEILPORTAL.ReferencingNotActive').subscribe(value=>{
			this.referencingNotActiveText = value;

		})
	}

	async openFeedbackPopover(type:string){
		let modal = await this.modalController.create({
			component: PopoverFeedbackComponent,
			cssClass: 'my-custom-class',
			componentProps: {homeref:this, type:type },
		});

		return await modal.present();

	}
	async presentToast() {
		const toast = await this.toastController.create({
			header: this.referencingNotActiveText,
			position:'top',
			duration: 10000,
			buttons: [
			{
				text: 'Référencez',
				role: 'cancel',
				handler: () => {
					this.router.navigate(['/referencing']);
				}
			}
			]
		});
		toast.present();
	}

	dismiss(){
		this.modalController.dismiss();
	}

	ionViewWillLeave(){
		this.uidChangesSub.unsubscribe();
		this.userChangesSub.unsubscribe();
		this.projectsDetailsbyUidSub.unsubscribe();
	}

	


}
