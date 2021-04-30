import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { first } from 'rxjs/operators';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';



import {Conseil} from '../../models/conseil'
import {ConseilService} from '../../services/conseil.service'
import { CMSService} from '../../services/cms.service';
import {DataSharingServiceService} from '../../services/data-sharing-service.service';
import { LoginComponent } from '../../landing-page/login/login.component';


@Component({
	selector: 'app-conseil',
	templateUrl: './conseil.page.html',
	styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {

	public isLogged:boolean=false;
	public conseils=[];
	public filter={
		name:"",
		cities:[],
		regions:[]
	}
	public numberofConseils = "53";

	public cities=[];
	public regions=[];

	public cityExpanded:boolean=false;
	public regionExpanded:boolean=false;


	public conseilChangesSub: Subscription = new Subscription();
	public conseilCountChangesSub: Subscription = new Subscription();

	constructor(
		public conseilService:ConseilService,
		public CMSService:CMSService,
		public dataSharingServiceService:DataSharingServiceService,
		public angularFireAnalytics:AngularFireAnalytics,
		public modalController:ModalController,
		public router:Router,


		) { }


	ngOnInit() {}

	ionViewWillEnter(){
		this.conseilChangesSub = this.conseilService.getConseils().subscribe(
			conseils =>{
				this.conseils = conseils.sort((n1,n2) => n1.name.localeCompare(n2.name));
				this.cities=[];
				this.regions=[];
				for(let i =0; i< this.conseils.length;i++){
					this.conseils[i].hidden = false;
					let indexCity = this.cities.findIndex(e => e.name === this.conseils[i].city)
					if(indexCity !==-1){
						this.cities[indexCity].count ++;
					} 
					else{
						this.cities.push({name:this.conseils[i].city, count:1})
					}
					let indexRegion = this.regions.findIndex(e => e.name === this.conseils[i].region)
					if(indexRegion !==-1){
						this.regions[indexRegion].count ++;
					} 
					else{
						this.regions.push({name:this.conseils[i].region, count:1})
					}
				}
				this.cities = this.cities.sort((n1,n2) => n1.name.localeCompare(n2.name));
				this.regions = this.regions.sort((n1,n2) => n1.name.localeCompare(n2.name));
			})
		this.conseilCountChangesSub = this.CMSService.getStatistics().pipe(first()).subscribe( (data:any)=>{
			this.numberofConseils = data.conseilsCount;
		})

		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>{
				(uid ===-1)? this.isLogged = false : this.isLogged = true;
			})
	}


	ionViewWillLeave(){
		this.conseilCountChangesSub.unsubscribe();
		this.conseilChangesSub.unsubscribe();
	}
	
	getConseils(){

	}
	requestAddConseil(){
		console.log("requestAddConseil", this.isLogged);
		(this.isLogged ===true)? this.presentAddConseilPopover() : this.presentLoginPopover();

	}

	async presentLoginPopover() {
		this.angularFireAnalytics.logEvent('page_view', {page_path: '/conseils/login',  page_title: 'login'});
		const popover = await this.modalController.create({
			component: LoginComponent,
			componentProps:{homeref:this, reason:"ConseilAccess"},
			cssClass: 'onboardingPopup',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissLoginPopover(){
		this.modalController.dismiss();
	}
	async presentAddConseilPopover() {
		this.router.navigate(['/referencing']);

	}

	expandFilter(filterType){
		if(filterType ==='city'){
			this.cityExpanded = !this.cityExpanded;
		}
		if(filterType ==='region'){
			this.regionExpanded = !this.regionExpanded;
		}
	}
	selectFilter(type, filter,event){
		if(type ==='city'){
			if(event.detail.checked ===true){
				this.filter.cities.push(filter.name);
			}
			else{
				this.filter.cities.splice(this.filter.cities.indexOf(filter.name), 1);
			}
		}
		if(type ==='region'){
			if(event.detail.checked ===true){
				this.filter.regions.push(filter.name);
			}
			else{
				this.filter.regions.splice(this.filter.regions.indexOf(filter.name), 1);
			}
		}
		this.applyFilter();
	}

	applyFilter(){
		for(let i =0; i< this.conseils.length;i++){
			let hidden = true;
			if(this.filter.regions.length === 0 && this.filter.cities.length ===0){
				hidden = false;
			}
			else{
				if(this.filter.cities.length >0){
					for(let j=0;j<this.filter.cities.length;j++){
						if(this.conseils[i].city === this.filter.cities[j] ){
							hidden = false;
						}
					}
				}
				if(hidden !== false){
					if(this.filter.regions.length >0){
						for(let j=0;j<this.filter.regions.length;j++){
							if(this.conseils[i].region === this.filter.regions[j] ){
								hidden = false;
							}
						}
					}
				}
			}
			

			
			this.conseils[i].hidden = hidden

		}

	}



}
