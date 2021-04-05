import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { AngularFireFunctions } from '@angular/fire/functions';

import * as moment from 'moment';

@Component({
	selector: 'app-users',
	templateUrl: './users.page.html',
	styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

	constructor(
		public userService:UserService,
		public functions:AngularFireFunctions,		
		) { }

	public users=[];

	public currentDateTime= moment().format();

	ngOnInit() 
	{
	}

	ionViewWillEnter(){
		this.userService.getUsers().subscribe(data=>{
			console.log("users",data);
			this.users= data;
		})
	}

	setAdmin(uid,role){
		console.log("setAdmin", uid,role);
		const callable = this.functions.httpsCallable('setAdmin');
		const obs = callable({uid: uid, role:role});
		obs.subscribe(res => {
			console.log("getProjectAccess", res);
		});		
	}

}
