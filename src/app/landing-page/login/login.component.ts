import { Component, OnInit,Input } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavParams} from '@ionic/angular';
import {DataSharingServiceService} from '../../services/data-sharing-service.service';



@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

	constructor(
		public authService: AuthService,
		public router:Router,
		public navParams: NavParams,
		public dataSharingServiceService:DataSharingServiceService,


		) { }

	public user={email:"",password:""};
	public mode:string="login";
	@Input("homeref") value;
	@Input("reason") reason=null;

	ngOnInit() {

		
	}

	loginWithGoogle(){
		this.authService.loginWithGoogle().then((data)=>
		{
			if(data.user){
				this.dataSharingServiceService.onBoardingStarted({started:false, role:null});

				
			}
		});
	}
	loginWithFacebook(){
		this.authService.loginWithFacebook().then((data)=>
		{
			if(data.user){
				this.dataSharingServiceService.onBoardingStarted({started:false, role:null});
				
			}
		});
	}
	loginWithEmail(){
		this.authService.loginWithEmail(this.user.email, this.user.password).then((data)=>
		{
			this.dataSharingServiceService.onBoardingStarted({started:false, role:null});
			
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

	dismiss(){
		this.navParams.get('homeref').dismissLoginPopover()
	}
	openSignUp(){
		this.navParams.get('homeref').dismissLoginPopover();

		this.navParams.get('homeref').presentSignUpPopover()
	}
}
