import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-solution-menu',
	templateUrl: './solution-menu.component.html',
	styleUrls: ['./solution-menu.component.scss'],
})
export class SolutionMenuComponent implements OnInit {

	@Input("isLogged") isLogged;
	@Input("homeref") value;

	constructor(
		public navParams: NavParams,
		) { }


	presentSignUp(){
		this.navParams.get('homeref').dismissSolutionMenuPoverer();
		this.navParams.get('homeref').presentSignUpPopover()
	}

	ngOnInit() {}

	dismissSolutionMenuPoverer(){
		this.navParams.get('homeref').dismissSolutionMenuPoverer();

	}

}
