import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
	providedIn: 'root'
})
export class DataSharingServiceService {

	private projectDataSource = new BehaviorSubject(null);

	private projectChanges = this.projectDataSource.asObservable();

	constructor() { }

	currentProject(project){
		this.projectDataSource.next(project);
	}
	getProjectChanges(){
		return this.projectChanges;
	}


}
