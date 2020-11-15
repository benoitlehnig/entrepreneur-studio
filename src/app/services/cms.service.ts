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
						arr.push({'label':data.labels[key]})  
						return arr;  
					}); 
				}
				let arrStage = [];  
				if(data.stages){
					Object.keys(data.stages).map(function(key){  
						arrStage.push({'label':data.stages[key]})  
						return arrStage;  
					}); 
				}
				//filter on lavels

				data.labels=arr;
				const id = a.payload.doc.id;

				let matchedCategories = true;
				if(filter.categories.length>0){
					matchedCategories = false;
					for(let i=0; i< filter.categories.length;i++){
						if(arr.find(x => x.label == filter.categories[i]) !== undefined){
							matchedCategories = true;
							break;
						}
					}
				}

				let matchedStages = true;
				if(filter.stages.length>0){
					matchedStages = false;
					for(let i=0; i< filter.stages.length;i++){
						if(arrStage.find(x => x.label == filter.stages[i]) !== undefined){
							matchedStages = true;
							break;
						}
					}
				}
				data.filtered = !(matchedCategories && matchedStages);
				
				
			return { id, ...data };
				
			});
		})
		)
	}
	getCGU(){
		const cguCollection = this.afs.collection<any>('CGU');
		return cguCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				console.log("OK CGU")
				const data = a.payload.doc.data() as any;
				const id = a.payload.doc.id;
				return { id, ...data };
			})))
	}

}
