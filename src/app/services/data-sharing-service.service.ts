import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
	providedIn: 'root'
})
export class DataSharingServiceService {

	private projectDataSource = new BehaviorSubject(null);
	private uidDataSource = new BehaviorSubject(null);
	private userDataSource = new BehaviorSubject(null);
	private userOnBoardingStarted = new BehaviorSubject(null);
	private currentTimelineStepSource = new BehaviorSubject(null);

	private projectChanges = this.projectDataSource.asObservable();
	private uidChanges = this.uidDataSource.asObservable();
	private userChanges = this.userDataSource.asObservable();
	private userOnBoardingChanges = this.userOnBoardingStarted.asObservable();
	private currentTimelineStepChanges = this.currentTimelineStepSource.asObservable();

	constructor() { }

	currentProject(project){
		this.projectDataSource.next(project);
	}
	getProjectChanges(){
		return this.projectChanges;
	}

	currentUid(uid){
		console.log("currentUid", uid, Date.now())
		this.uidDataSource.next(uid);
	}
	getUidChanges(){
		return this.uidChanges;
	}
	currentUser(user){
		this.userDataSource.next(user);
	}
	getUserChanges(){
		return this.userChanges;
	}
	onBoardingStarted(value){
		this.userOnBoardingStarted.next(value);
	}
	getUserOnBoardingChanges(){
		return this.userOnBoardingChanges;
	}
	currentTimelineStep(value){
		this.currentTimelineStepSource.next(value);
	}
	getCurrentTimelineStepChanges(){
		return this.currentTimelineStepChanges;
	}


}
