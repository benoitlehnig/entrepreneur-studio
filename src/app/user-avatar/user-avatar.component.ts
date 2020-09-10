import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@Component({
	selector: 'app-user-avatar',
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {

	public photoURL:string=null
	constructor(
		public authService: AuthService,
		public popoverController: PopoverController,

		) { }

	ngOnInit() {
		this.authService.getUserDetails().subscribe(
			data =>{
				if(data){
					console.log("this.photoURL", this.photoURL);
					this.photoURL = data.photoURL;
				}
				
			})	
		}

		async presentPopover(ev: any) {
			const popover = await this.popoverController.create({
				component: PopoverComponent,
				componentProps: {homeref:this},
				event: ev,
				translucent: true
			});
			return await popover.present();
		}
		dismissPopover(){
			this.popoverController.dismiss();
		}

	}
