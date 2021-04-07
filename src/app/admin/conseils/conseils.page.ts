import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {Conseil} from '../../models/conseil'
import {ConseilService} from '../../services/conseil.service'

@Component({
  selector: 'app-conseils',
  templateUrl: './conseils.page.html',
  styleUrls: ['./conseils.page.scss'],
})
export class ConseilsPage implements OnInit {

  	
  	public conseils=[];

  	public conseilChangesSub: Subscription = new Subscription();

	
	constructor(
		public conseilService:ConseilService
		) { }

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.conseilChangesSub = this.conseilService.getConseils().subscribe(
			conseils =>{
				this.conseils = conseils;
			})
	}

	

	ionViewWillLeave(){
		this.conseilChangesSub.unsubscribe();
	}

}
