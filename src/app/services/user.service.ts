import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private afs: AngularFirestore) 
	{ }


	getUserDetails(id){
		return this.afs.doc<User>('users/'+id).valueChanges()
	}

}
