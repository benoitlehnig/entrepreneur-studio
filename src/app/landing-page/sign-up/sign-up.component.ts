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
	public incubator:boolean=false;

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
				if(this.incubator ===true){
						this.role ="incubator";
				}
				else{
					this.role ="entrepreneur";
				}
				const obs = callable({uid:data.user.uid, role:this.role});
				obs.subscribe(res => {
					this.router.navigate(['/folder/Inbox']); 
				});
			}
		});
	}

}
