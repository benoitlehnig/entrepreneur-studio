import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Project} from '../models/project';
import { map, switchMap } from 'rxjs/operators'

@Injectable({
	providedIn: 'root'
})
export class ProjectService {

	projectRef = this.afs.collection<Project>('projects');
	
	constructor(		
		private afs: AngularFirestore) 
	{ }

	getProjectbyOwnerUid(uid:string){
		return this.afs.collection<Project>('projects', ref => ref.where('ownerUid', '==', uid)).snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data() as Project;
				const id = a.payload.doc.id;
				return { id, ...data };
			});
		})
		);
	}

	getProject(id:string){
		return this.afs.doc<Project>('projects/' +id).valueChanges()
		
	}
}
