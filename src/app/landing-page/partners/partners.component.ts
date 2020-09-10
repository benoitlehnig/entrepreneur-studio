import { Component, OnInit,Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-partners',
	templateUrl: './partners.component.html',
	styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {

	public partnerRequest ={
		name:"",
		email:"",
		activity:"",
		description:""
	}

	@Input("homeref") value;

	
	constructor(
		private functions: AngularFireFunctions,
		public navParams : NavParams,

		) { }

	ngOnInit() {}


	submitForm(){
		const callable = this.functions.httpsCallable('newPartnerRequest');
		const obs = callable(this.partnerRequest);
		obs.subscribe(async res => {
			this.navParams.get('homeref').dismissRegisterPopover();
		});

	}

}
