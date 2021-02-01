import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private auth: AngularFireAuth, 
		private router: Router
		)
	{

	}
	canActivate() {
		return this.auth.authState.pipe(
			take(1),
			switchMap(async (authState) => {
				if (authState) { // check are user is logged in
					const token = await authState.getIdTokenResult()
					if (token.claims.entrepreneur === true) { // check claims
						console.log("")
						this.router.navigate(['/entrepreneur'])
						return true
					}
					else if (token.claims.incubator === true) { // check claims
						this.router.navigate(['/conseil'])
						return true
					}
					else {
						console.log("canActivate", )
						this.router.navigate(['/fr/intl'])
						return true
					}
				} else {
					console.log("canActivate", )
					this.router.navigate(['/fr/intl'])
					return false
				}
			}),
			)
	}

}
