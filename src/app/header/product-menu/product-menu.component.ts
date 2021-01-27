import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-product-menu',
	templateUrl: './product-menu.component.html',
	styleUrls: ['./product-menu.component.scss'],
})
export class ProductMenuComponent implements OnInit {

	@Input("homeref") value;
	@Input("isLogged") isLogged;

	constructor(
		public navParams:NavParams) { }

	ngOnInit() {}

	dismissProductMenuPoverer(){
		this.navParams.get('homeref').dismissProductMenuPoverer();
	}
	scrollTo(el){
		this.dismissProductMenuPoverer();

		this.navParams.get('homeref').scrollTo(el);
	}
	displayRoadmap(){
		this.navParams.get('homeref').dismissProductMenuPoverer();
		this.navParams.get('homeref').displayRoadmap();

	}
	

}
