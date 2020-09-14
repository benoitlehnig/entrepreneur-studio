import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';
import {DataSharingServiceService} from './data-sharing-service.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public user: Observable<firebase.User>;
	public claims={};

	constructor(
		private afAuth: AngularFireAuth,
		public router:Router,
		public userService:UserService,
		public dataSharingServiceService:DataSharingServiceService

		) {
		this.user = this.afAuth.authState;
		this.afAuth.onAuthStateChanged((user) => {
			if (user) {
				this.dataSharingServiceService.currentUid(user.uid);
				user.getIdTokenResult().then(
					result=> {
						console.log("result",result);
						this.claims = result.claims;
						if(this.claims['entrepreneur'] ===true){
							if(this.router.url.indexOf("admin") !== -1){
								console.log("navigate admin");
								this.router.navigate(['/admin']);
							}	
							else if(this.router.url.indexOf("entrepreneur") === -1){
								console.log("navigate");
								this.router.navigate(['/entrepreneur']);
							}				
						}
						else if(this.claims['incubator'] ===true){
							//this.router.navigate(['/incubator']);
						}
						this.userService.getUserDetails(user.uid).subscribe(
							data=>{

								if(data){
									this.dataSharingServiceService.currentUser(data);
									console.log(">user", data);
								}
							})
					})
			} else {
				console.log("user not logged in auth");
				this.router.navigate(['/landing-page']); 
			}
		}); 

	}

	loginWithGoogle() {
		return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then((result) => {
			return result;
		});
	}

	loginWithFacebook() {
		return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider).then((result) => {
			return result;
		});
	}

	loginWithGitHub() {
		return this.afAuth.signInWithPopup(new auth.GithubAuthProvider).then((result) => {
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
}
