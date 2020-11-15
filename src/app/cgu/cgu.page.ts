import { Component, OnInit } from '@angular/core';
import {CMSService } from '../services/cms.service';
import * as moment from 'moment';


@Component({
	selector: 'app-cgu',
	templateUrl: './cgu.page.html',
	styleUrls: ['./cgu.page.scss'],
})
export class CguPage implements OnInit {

	public cgu=null;
	public lastUpdateDate = moment();

	constructor(
		public CMSService:CMSService) { }

	ngOnInit() {
	}
	ionViewDidEnter(){
		this.CMSService.getCGU().subscribe(
			cgu => {
				console.log(cgu, this.lastUpdateDate);
				if(cgu !== null ){
					this.cgu = cgu;
					for(let i =0;i<this.cgu.length;i++){
						if(moment(this.lastUpdateDate).isAfter(
							moment.unix(this.cgu[i].updated_at.seconds))	
							){
							this.lastUpdateDate = moment.unix(this.cgu[i].updated_at.seconds).utc()
					}
				}
			}
		})
	}

}
