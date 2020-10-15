import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators'

@Injectable({
	providedIn: 'root'
})
export class CMSService {

	constructor(private afs: AngularFirestore) {

	}


	public retrieveToolsContent(filter:any ){
		return this.afs.collection<any>("tools").snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				let filterPositive = false;
				let data = a.payload.doc.data();
				let arr = [];  
				if(data.labels){
					Object.keys(data.labels).map(function(key){  
						let arr2 = []; 
						arr.push({'label':data.labels[key]})  
						return arr;  
					}); 
				}
				//filter on lavels

				data.labels=arr;
				const id = a.payload.doc.id;

				let matchedCategories = true;
				if(filter.categories.length>0){
					matchedCategories = false;

					for(let i=0; i< filter.categories.length;i++){

						console.log(" x.label",
							arr, 
							 filter.categories[i],
							arr.find(x => x.label == filter.categories[i], 
							arr.find(x => x.label == filter.categories[i]) ===undefined ) )
						if(arr.find(x => x.label == filter.categories[i]) !== undefined){
							matchedCategories = true;
							break;
						}
					}
				}
				data.filtered = !matchedCategories;
				
			return { id, ...data };
				
			});
		})
		)
	}

}
