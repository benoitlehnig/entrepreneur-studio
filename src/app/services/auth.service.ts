import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public user: Observable<firebase.User>;
	public claims={};

	constructor(
		private afAuth: AngularFireAuth,
		public router:Router,

		) {
		this.user = this.afAuth.authState;
		this.afAuth.onAuthStateChanged((user) => {
			if (user) {
				user.getIdTokenResult().then(
					result=> {
						console.log("result",result);
						this.claims = result.claims;
						if(this.claims['entrepreneur'] ===true){
							this.router.navigate(['/entrepreneur']);
						}
						else if(this.claims['incubator'] ===true){
							this.router.navigate(['/incubator']);
						}
						else{
							alert("you don;t have an account, please register");
						}
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

	logout() {
		this.afAuth.signOut();
	}
	getUserDetails() {
		return this.afAuth.user
	}
	getClaims(){
		return this.claims;
	}
}
