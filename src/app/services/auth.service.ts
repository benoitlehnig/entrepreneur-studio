import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';
import {DataSharingServiceService} from './data-sharing-service.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import firebase from 'firebase/app';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public user: Observable<any>;
	public claims={};

	constructor(
		private afAuth: AngularFireAuth,
		public functions : AngularFireFunctions,
		public router:Router,
		public userService:UserService,
		public dataSharingServiceService:DataSharingServiceService

		) {
		this.user = this.afAuth.authState;
		this.afAuth.onAuthStateChanged((user) => {
			console.log("router : ", this.router.url);
			if (user) {
				console.log(" this.afAuth.authState, ", user)
				this.dataSharingServiceService.currentUid({uid: user.uid, email: user.email});
				
				user.getIdTokenResult().then(
					result=> {
						console.log("result router",result,this.router.url,result.claims,this.router.url.indexOf("landing") );
						this.claims = result.claims;
						if(this.claims['entrepreneur'] ===true){
							
							console.log("result router2",result,this.router.url,result.claims,this.router.url.indexOf("landing") );

							if(this.router.url.indexOf("landing") !== -1){
								console.log("navigate entrepreneur");
								this.router.navigate(['/entrepreneur']);
							}
							else if(this.router.url.indexOf("admin") !== -1){
								console.log("navigate admin");
							//	this.router.navigate(['/admin']);
							}	
							else if(this.router.url.indexOf("tools") !== -1){
								console.log("navigate");
								//this.router.navigate(['/tools']);
							}
							if(this.router.url.indexOf("cgu") !== -1){
								console.log("navigate");
							//	this.router.navigate(['/cgu']);
							}
							if(this.router.url.indexOf("project") !== -1){
								//this.router.navigate(['/entrepreneur']);
							}				
						}
						else if(this.claims['incubator'] ===true){
							//this.router.navigate(['/incubator']);
						}
						else{
							this.router.navigate(['/entrepreneur']);
						}
						this.userService.getUserDetails(user.uid).subscribe(
							data=>{
								if(data){
									this.dataSharingServiceService.currentUser(data);
									console.log(">user", data);
									if(data.photoUrl !== user.photoURL){
										this.updatePhotoUrl(user);
									}
								}
							})
					})
			} else {
				console.log("user not logged in auth");
				console.log("router : ", this.router.url);
				this.dataSharingServiceService.currentUid(null);
				console.log(this.router.url.indexOf("entrepreneur")   , this.router.url.indexOf("project") );
				if(this.router.url.indexOf("cgu") !== -1){
					console.log("navigate cgu");
					this.router.navigate(['/cgu']);
				}
				else if( this.router.url.indexOf("entrepreneur") === -1 && this.router.url.indexOf("project") ===-1){

					this.router.navigate(['/landing-page']); 
				}

				else{
					this.router.navigate(['/landing-page']);
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
