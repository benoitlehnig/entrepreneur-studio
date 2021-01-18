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

	addTool(tool:Tool){
		console.log("addTool",tool)
		return this.toolRef.add(JSON.parse( JSON.stringify(tool)));
	}

	

}
