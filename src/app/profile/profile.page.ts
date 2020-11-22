import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';

import {User} from '../models/user';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { AppConstants } from '../app-constants';
@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	public user:User = new User();
	public userIds ;
	public profileUpdatedText:string="";
	public emailPattern = this.appConstants.emailPattern;
	
	constructor(
		public userService:UserService,
		public authService:AuthService,
		public toastController: ToastController,
		public translateService : TranslateService,
		public appConstants : AppConstants,

		) { }

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.authService.getUserDetails().subscribe(
			data => {
				if(data){
					this.userIds= data;
					this.userService.getUserDetails(this.userIds.uid).subscribe(
						data2=>{
							if(data2){
								this.user=data2
							}
						})
				}
			});
		this.translateService.get('PROFILE.UpdateSuccessful').subscribe(
			value => {
				if(value){
					this.profileUpdatedText = value;
				}
			})

	}
	async save(){
		this.userService.setProfile(this.userIds.uid, this.user).then(
			data=>{
			this.presentToast();
			});
	}

	async presentToast() {
		const toast = await this.toastController.create({
			message: this.profileUpdatedText,
			position:'top',
			duration: 2000
		});
		toast.present();
	}


}
