import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';

import {User} from '../models/user';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	public user:User = new User();
	public uid:string="";
	
	constructor(
		public userService:UserService,
		public authService:AuthService,
		) { }

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.authService.getUserDetails().subscribe(
			data => {
				if(data){
					this.uid= data.uid;
					this.userService.getUserDetails(this.uid).subscribe(
						data2=>{
							if(data2){
								this.user=data2
							}
						})
				}
			});
	}

}
