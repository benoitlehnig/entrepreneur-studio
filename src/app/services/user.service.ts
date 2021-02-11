import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'


@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private afs: AngularFirestore
		) 
	{ }


	getUserDetails(id){
		return this.afs.doc<User>('users/'+id).valueChanges()
	}

	setOnboardingDone(id){
		console.log(id);
		return this.afs.doc('users/'+id).update({'onBoardingDone':true});
	}

	setProfile(id,profile){
		console.log("setProfile: ", profile,id);
		return this.afs.doc('users/'+id).update(profile).then(
			data=>{console.log("setProfile: ",data)});
	}
	likeTool(id,tool){
		console.log("likeTool >> ", id, tool)
		return this.afs.collection('users/'+ id+'/toolLikes').doc(tool.id).set({like:true});

	}
	unlikeTool(id,tool){
		console.log("unlikeTool >> ", id, tool)
		return this.afs.collection('users/'+ id+'/toolLikes').doc(tool.id).delete();
	}
	getLikedTools(id){
		return this.afs.collection('users/'+id+'/toolLikes').snapshotChanges().pipe(map(actions => {
			console.log("getLikedTools", actions)
			return actions.map(a => {
				return a.payload.doc.id
			})

		}))
	}

	getUsers(){
		return this.afs.collection<User>('users').snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data();
				const id = a.payload.doc.id;
				return { id, ...data };
			});
		})
		);
	}

}
