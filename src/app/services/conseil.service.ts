import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Conseil} from '../models/conseil';
import { map, switchMap } from 'rxjs/operators'

@Injectable({
	providedIn: 'root'
})
export class ConseilService {


	conseilRef = this.afs.collection<Conseil>('conseils');

	constructor(
		private afs: AngularFirestore) 
	{ }

	getConseils(){
		return this.conseilRef.snapshotChanges().pipe(map(conseils => {
			return conseils.map(a => {
				const data = a.payload.doc.data() as Conseil;
				const id = a.payload.doc.id;
				return { id, ...data };
			});
		})
		);
	}
	getConseil(id){
		return this.afs.doc<Conseil>('conseils/' +id).snapshotChanges().pipe(map(conseil => { 
			const data = conseil.payload.data() as Conseil;
			const id = conseil.payload.id;
			return { id, ...data };
		})
		);
	}

	save(id,conseil){
		return this.afs.doc<Conseil>('conseils/'+id).update(conseil);
	}

	add(conseil){
		return this.afs.collection<Conseil>('conseils').add(conseil);
	}
	delete(id){
		return this.afs.doc<Conseil>('conseils/'+id).delete();
	}

}
