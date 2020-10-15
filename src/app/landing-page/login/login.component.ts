import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

	constructor(
		public authService: AuthService,
		public router:Router,
		) { }

	public user={email:"",password:""};
	public mode:string="login";

	ngOnInit() {}

	loginWithGoogle(){
		this.authService.loginWithGoogle().then((data)=>
		{
			console.log(data);
			if(data.user){
				console.log(" user logged");
				
			}
		});
	}
	loginWithFacebook(){
		this.authService.loginWithFacebook().then((data)=>
		{
			console.log(data);
			if(data.user){
				console.log(" user logged");
				
			}
		});
	}
	loginWithEmail(){
		this.authService.loginWithEmail(this.user.email, this.user.password).then((data)=>
		{
			console.log(data);
			
		});
	}
	requestResetPasswordPage(){
		this.mode ="resetPassword";
	}
	resetPasswordCancel(){
		this.mode ="login";
	}
	resetPassword(){
		this.authService.resetPassword(this.user.email);
	//	this.presentToast();
		this.mode ="login";
	}

}
