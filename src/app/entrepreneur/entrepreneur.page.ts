import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import {Project} from '../models/project';

@Component({
	selector: 'app-entrepreneur',
	templateUrl: './entrepreneur.page.html',
	styleUrls: ['./entrepreneur.page.scss'],
})
export class EntrepreneurPage implements OnInit {

	constructor(
		public functions:AngularFireFunctions
		) { }

	ngOnInit() {
	}

	startNewProject(){
		let project = new Project();
		const callable = this.functions.httpsCallable('createProject');
		const obs = callable(project);
		obs.subscribe(res => {
			console.log("done")
		});

	}

}
