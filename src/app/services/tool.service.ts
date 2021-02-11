import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Tool} from '../models/tool';
import { map, switchMap } from 'rxjs/operators'


@Injectable({
	providedIn: 'root'
})
export class ToolService {

	toolRef = this.afs.collection<Tool>('tools');

	constructor(
		private afs: AngularFirestore) 
	{ }

	getTools(){
		return this.afs.collection<Tool>('tools').snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data() as Tool;
				const id = a.payload.doc.id;
				return { id, ...data };
			});
		})
		);
	}

	

	getTool(id){
		return this.afs.doc<Tool>('tools/' +id).valueChanges()
	}

	save(id,tool){
		return this.afs.doc<Tool>('tools/'+id).update(tool);
	}
	add(tool){
		return this.afs.collection<Tool>('tools').add(tool);
	}
	delete(id){
		return this.afs.doc<Tool>('tools/'+id).delete();
	}
	
	

}
