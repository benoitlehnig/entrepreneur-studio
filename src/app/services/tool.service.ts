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
	

	getCategories(){
		return this.afs.collection('ApplicationParameters/tools/categories').snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data() as any;
				const id = a.payload.doc.id;
				return { id, ...data };

			});
		})
		);
	}

	addCategory(category,newCategoryId){
		console.log("newCategoryId", newCategoryId)
		return this.afs.doc('ApplicationParameters/tools/categories/'+newCategoryId).set(category);
	}
	deleteCategory(id){
		return this.afs.collection<any>('ApplicationParameters/tools/categories').doc(id).delete();
	}
	updateCategory(categoryId,category){
		return this.afs.collection<any>('ApplicationParameters/tools/categories').doc(categoryId).set(category);
	}

}
