import { Component, OnInit,Input } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {


	constructor(
		public authService:AuthService,
		public router:Router,
		public navParams:NavParams,

		) { }

	@Input("homeref") value;
	
	
	ngOnInit() {}

	logout(){
		this.authService.logout()
	}

	navigateToProfile(){
		this.router.navigate(['/profile']);
		this.navParams.get('homeref').dismissPopover();
	}


}
