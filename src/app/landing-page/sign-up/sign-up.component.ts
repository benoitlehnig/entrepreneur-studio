import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import {User} from '../../models/user';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

	public role:string="entrepreneur";

	constructor(
		public authService: AuthService,
		public router:Router,
		private functions: AngularFireFunctions,


		) { }

	ngOnInit() {}

	loginWithGoogle(){
		this.authService.loginWithGoogle().then((data)=>
		{
			console.log("loginWithGoogle",data);
			if(data.user){
				const callable = this.functions.httpsCallable('createUser');
				const obs = callable({uid:data.user.uid, role:this.role});
				obs.subscribe(res => {
					if(this.role ==='entrepreneur'){
						this.router.navigate(['/folder/Inbox']); 
					}
					if(this.role==='incubator'){
						this.router.navigate(['/folder/Inbox']); 
					}
				});
			}
		});
	}

}
