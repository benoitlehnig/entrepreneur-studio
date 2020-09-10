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

	saveProject(id:string,project:Project){
		console.log("saveProject", id, project)
		return this.projectRef.doc(id).set(JSON.parse( JSON.stringify(project)));
	}
	addElement(id:string,elementType:string,elementData){
		console.log("addElement", id, elementType,elementData)
		return this.afs.collection('projects').doc(id+'/businessCanvas').collection('problem').add({ name: 'item', price: 10 }).then(
			value=> {return value.id})

	}

}
