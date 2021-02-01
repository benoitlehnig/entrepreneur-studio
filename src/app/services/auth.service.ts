import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';
import {DataSharingServiceService} from './data-sharing-service.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public user: Observable<any>;
	public claims={};
	public logggedIn:boolean=false;

	constructor(
		private afAuth: AngularFireAuth,
		public functions : AngularFireFunctions,
		public router:Router,
		public userService:UserService,
		public dataSharingServiceService:DataSharingServiceService,

		) {
		this.user = this.afAuth.authState;
		this.afAuth.onAuthStateChanged((user) => {
			console.log("AuthService >> onAuthStateChanged : ", user, this.router.url);
			if (user) {
				console.log("AuthService >> this.afAuth.authState, ", user)
				this.logggedIn = true;
				
				user.getIdTokenResult().then(
					result=> {
						console.log("AuthService >> user,user.uid , result, router",user, user.uid , result,this.router.url,result.claims,this.router.url.indexOf("landing") );
						this.claims = result.claims;
						let userSubscription = this.userService.getUserDetails(user.uid).subscribe(
							data=>{
								console.log("AuthService >> this.userService.getUserDetails", data, Date.now())
								if(data && this.logggedIn){
									console.log("AuthService >> this.dataSharingServiceService.currentUid",user.uid,data.email )
									this.dataSharingServiceService.currentUid({uid: user.uid, email: data.email});
									this.dataSharingServiceService.currentUser(data);
									if(data.photoUrl !== user.photoURL){
										this.updatePhotoUrl(user);
									}
									console.log("AuthService >> claims", this.claims)
									if(this.claims['entrepreneur'] ===true){
										console.log("AuthService >> result router2",result,this.router.url,result.claims,this.router.url.indexOf("/intl/") );
										if(this.router.url.indexOf("/intl/") !== -1){
											console.log("AuthService >> navigate entrepreneur");
											if(this.router.url.indexOf("/intl/fr/tools") !==-1){
												//this.router.navigate(['/intl/fr/tools']);

											}
											else if(this.router.url.indexOf("/project/") !==-1){
												//this.router.navigate(['/intl/fr/tools']);

											}
											else{
												console.log("AuthService >> navigate entrepreneur");
												this.router.navigate(['/entrepreneur']);
											}
										}				
									}
									else if(this.claims['incubator'] ===true){
										this.router.navigate(['/conseil']);
									}
									else{

									}
								}
								else if(!data && this.logggedIn){
									this.dataSharingServiceService.getUserOnBoardingChanges().pipe(first()).subscribe((onBoarding) =>{
										if(onBoarding){
											if(onBoarding.started ===true){
												if(onBoarding.role === 'entrepreneur'){
													this.router.navigate(['/entrepreneur']);
												}
												if(onBoarding.role === 'incubator'){
													this.router.navigate(['/conseil']);
												}

											}
											else{
												console.log("AuthService >> AuthService NO USER  ONBOARDING STARTED", data, onBoarding.started);
												this.dataSharingServiceService.currentUid(null);								
												this.router.navigate(['/intl/fr',{ unknownUser:true}]); 
											}
										}
									})
								}
								else{
									userSubscription.unsubscribe();
								}

							})
					})
			} else {
				console.log("AuthService >> AuthService, user not logged in auth");
				console.log("AuthService >> router : ", this.router.url);
				this.dataSharingServiceService.currentUid(-1);
				this.dataSharingServiceService.currentUser(null);
				this.dataSharingServiceService.onBoardingStarted({started:false, role:null});

				this.logggedIn = false;
				console.log("AuthService >> ",this.router.url.indexOf("entrepreneur")   , this.router.url.indexOf("project") );
				if(this.router.url.indexOf("cgu") !== -1){
					console.log("AuthService >> navigate cgu");
					this.router.navigate(['/intl/fr/cgu']);
				}
				else if( this.router.url.indexOf("entrepreneur") !== -1 || this.router.url.indexOf("conseil")!== -1){
					console.log("AuthService >> navigate landing, unknown true");
					this.router.navigate(['/intl/fr']); 
				}
				else{
					console.log("AuthService >> navigate landing, unknown false");

					//this.router.navigate(['/landing-page']); 
				}
			}
		}); 

	}

	loginWithGoogle() {
		return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
			return result;
		});
	}

	loginWithFacebook() {
		return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider).then((result) => {
			return result;
		});
	}

	loginWithGitHub() {
		return this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider).then((result) => {
			return result;
		});
	}


	logout() {
		this.afAuth.signOut();
	}
	getUserDetails() {
		return this.afAuth.user
	}
	getClaims(){
		return this.claims;
	}

	signUpEmail(email, password) {
		return this.afAuth.createUserWithEmailAndPassword(email, password)
		.then((result) => {
			console.log(result.user);
			return result;
		}).catch((error) => {
			window.alert(error.message)
		})
	}
	loginWithEmail(email,password) {
		return this.afAuth.signInWithEmailAndPassword(email,password).then((result) => {
			return result;
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			window.alert(errorMessage)
		});;
	}
	resetPassword(email: string) {
		return this.afAuth.sendPasswordResetEmail(email)
		.then(() => console.log("email sent"))
		.catch((error) => console.log(error))
	}

	updatePhotoUrl(user){
		console.log("updatePhotoUrl", user.uid,user.photoURL);
		const callable = this.functions.httpsCallable('updateUserPhotoUrl');
		const obs = callable({uid:user.uid, photoUrl:user.photoURL});

		obs.subscribe(res => {
			console.log("photoURL", "done");
		});
	}

	


}
