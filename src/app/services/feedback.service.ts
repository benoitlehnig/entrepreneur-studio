import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class FeedbackService {

	constructor(
		private afs: AngularFirestore
		) 
	{ }

	sendFeedback(feedback){
		console.log("sendFeedback", feedback );
		return this.afs.collection('feedback').add( feedback );
	}
}
