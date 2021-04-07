import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {Conseil} from '../../models/conseil'
import {ConseilService} from '../../services/conseil.service'


@Component({
	selector: 'app-conseil',
	templateUrl: './conseil.page.html',
	styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {

	public conseils=[];
	public filter={
		name:"",
		city:""
	}
	public numberofConseils = "233"

	public conseilChangesSub: Subscription = new Subscription();

	constructor(
		public conseilService:ConseilService
		) { }


	ngOnInit() {}

	ionViewWillEnter(){
		this.conseilChangesSub = this.conseilService.getConseils().subscribe(
			conseils =>{
				this.conseils = conseils.sort((n1,n2) => n1.name.localeCompare(n2.name));
			})
	}


	ionViewWillLeave(){
		this.conseilChangesSub.unsubscribe();
	}
	
	getConseils(){

	}

}
