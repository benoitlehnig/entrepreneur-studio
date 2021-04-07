import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators'

@Injectable({
	providedIn: 'root'
})
export class CMSService {

	public tools;

	constructor(private afs: AngularFirestore) {

	}
	public retrieveTimelineContent(){

		return this.afs.collection<any>("timeline").snapshotChanges().pipe(map(actions => {
			console.log("retrieveTimelineContent", actions)
			return actions.map(a => {
				return {id:a.payload.doc.id, data:a.payload.doc.data()}
			})

		}))
	}

	public retrieveToolsContent(filter:any ){
		console.log("retrieveToolsContent >>", filter);
		return this.afs.collection<any>("tools").snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				let data = a.payload.doc.data();
				const id = a.payload.doc.id;
				return { id, ...this.filterTool(data,filter) };
				
			});
		})
		).pipe(
		map(tools => {
			
			return  tools.filter(tool => tool.filtered === false);
		})
		)
	}

	filterTool(data, filter){
		let filterPositive = false;
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
		//filter on categories

		data.labels=arr;

		let matchedCategories = true;
		if(filter.categories.length>0){
			matchedCategories = false;
			for(let i=0; i< filter.categories.length;i++){
				if(arr.find(x => Number(x.label) == Number(filter.categories[i])) !== undefined){
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
		let matchedProductName = true;
		if(filter.productName !==""){
			matchedProductName = false;
			if(data.name.toLowerCase().startsWith(filter.productName.toLowerCase())){
				matchedProductName = true;
			}

		}
		data.filtered = !(matchedCategories && matchedStages && matchedProductName);

		return data;

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

	getSystemDParams(){
		return this.afs.doc('ApplicationParameters/systemD').valueChanges();

	}

	getStatistics(){
		return this.afs.doc('ApplicationParameters/statistics').valueChanges();
	}
	saveStatistics(data){
		return this.afs.doc('ApplicationParameters/statistics').set(data);
	}

	getConseils(){
		return this.afs.doc('conseils').valueChanges();

	}

}
