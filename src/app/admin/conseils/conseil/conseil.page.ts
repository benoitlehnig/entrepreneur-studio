import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';


import {Conseil} from '../../../models/conseil';
import {ConseilService} from '../../../services/conseil.service';

@Component({
	selector: 'app-conseil',
	templateUrl: './conseil.page.html',
	styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {


	public conseil: Conseil = new Conseil();
	public conseilId:string=""

	public mode="update";

	public conseilChangesSub: Subscription = new Subscription();

	constructor(
		public conseilService: ConseilService,
		private activatedRoute: ActivatedRoute,
		public router:Router,
		public translateService : TranslateService,
		public alertController : AlertController) { }


	ngOnInit() {

	}
	ionViewWillEnter(){
		let mode = this.activatedRoute.snapshot.paramMap.get('mode');
		if(mode ==='add'){
			this.mode = "add";
		}
		else{
			this.conseilId = this.activatedRoute.snapshot.paramMap.get('id');
			this.conseilChangesSub = this.conseilService.getConseil(this.conseilId).subscribe(data=>{
				console.log("getConseil",data);
				this.conseil= data;
			})
		}
	
		
		
		
	}
	ionViewWillLeave(){
		this.conseilChangesSub.unsubscribe();
	}

	save(){
		console.log("save" , this.conseil);
		
		if(this.mode ==='update'){
			this.conseilService.save(this.conseilId,this.conseil)
		}
		else{

			this.conseilService.add(JSON.parse(JSON.stringify(this.conseil)));
			this.router.navigate(['/admin/conseils']);
		}

	}
	delete(){
		this.conseilService.delete(this.conseilId);
		this.router.navigate(['/admin/tools']);

	}
	async requestDelete(){
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Supprimer '+this.conseil.name,
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: (blah) => {
					console.log('Confirm Cancel: blah');
				}
			}, {
				text: 'Okay',
				handler: () => {
					this.delete()
				}
			}
			]		});

		await alert.present();
	}


}
