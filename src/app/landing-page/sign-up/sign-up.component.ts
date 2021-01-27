import { Component, OnInit,Input } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import {User} from '../../models/user';
import { NavParams} from '@ionic/angular';
import {DataSharingServiceService} from '../../services/data-sharing-service.service';


@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

	public role:string="entrepreneur";
	public incubator:boolean=false;
	public user={email:"",password:""};
	public cguChecked:boolean=false;
	@Input("homeref") value;
	@Input("unknownUser") unknownUser;


	constructor(
		public authService: AuthService,
		public router:Router,
		private functions: AngularFireFunctions,
		public navParams: NavParams,
		public dataSharingServiceService:DataSharingServiceService,


		) { }

	ngOnInit() {}

	signUpGoogle(){
		this.authService.loginWithGoogle().then((data)=>
		{
			console.log("signUpGoogle",data);
			this.createUser(data);
		});
	}
	signUpFacebook(){
		this.authService.loginWithFacebook().then((data)=>
		{
			console.log("signUpFacebook",data);
			this.createUser(data);
		});
	}

	signUpEmail(){
		this.authService.signUpEmail(this.user.email,this.user.password).then(data=>{
			let newUserData:any = data;
			newUserData.additionalUserInfo.profile= { email : this.user.email}
			console.log("signUpEmail",newUserData);

			this.createUser(newUserData);
		})

	}

	createUser(data){
		if(data.user){
			
			const callable = this.functions.httpsCallable('createUser');
			if(this.incubator ===true){
				this.role ="incubator";
			}
			else{
				this.role ="entrepreneur";
			}
			this.dataSharingServiceService.onBoardingStarted({started:true, role:this.role });

			console.log("data.additionalUserInfo.profile",data.additionalUserInfo.profile)
			console.log("data.user",data.user)
			console.log("data.additionalUserInfo.",data.additionalUserInfo)
			const obs = callable({uid:data.user.uid, profileData:data.additionalUserInfo.profile,email:data.user.email, role:this.role});

			obs.subscribe(res => {
				if(this.role ==="entrepreneur" ){
					this.router.navigate(['entrepreneur']);
				}
				else if(this.role ==="incubator" ){
					this.router.navigate(['conseil']);
				}
				

			});
		}

	}
	dismiss(){
		this.navParams.get('homeref').dismissSignUpPopover()

	}

}
