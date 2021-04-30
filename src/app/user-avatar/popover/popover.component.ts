import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {QuestionPage} from '../../question/question.page';
import { Subscription } from 'rxjs';

import { PartnersComponent } from '../../landing-page/partners/partners.component';


import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';


@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {


	constructor(
		public authService:AuthService,
		public router:Router,
		public navParams:NavParams,
		private modalController: ModalController,
		public userService:UserService,

		) { }

	@Input("homeref") value;
	
	public user:User = new User();
	public userChangesSub: Subscription = new Subscription();
	public userDetailsChangesSub: Subscription = new Subscription();

	
	ngOnInit() {}

	ionViewWillEnter(){
		this.userChangesSub = this.authService.getUserDetails().subscribe(
			data => {
				if(data){
					this.userDetailsChangesSub = this.userService.getUserDetails(data.uid).subscribe(
						user=>{
							if(user){
								this.user=user;
							}
						})
				}
			});
	}
	
	ionViewWillLeave(){
		this.userChangesSub.unsubscribe();
		this.userDetailsChangesSub.unsubscribe();
	}

	logout(){
		this.authService.logout()
	}

	navigateTo(page){
		if(page ==='referencing'){
			this.router.navigate(['/referencing']);
		}
		if(page ==='profile'){
			this.router.navigate(['/profile']);
		}
		this.navParams.get('homeref').dismissPopover();
	}



	async presentPartnersPopover() {
		this.navParams.get('homeref').dismissPopover();

		const popover = await this.modalController.create({
			component: PartnersComponent,
			componentProps:{homeref:this},
			cssClass: 'registerPopover',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissParnersPopover(){
		this.navParams.get('homeref').dismissPopover();
		this.modalController.dismiss();
	}
}
