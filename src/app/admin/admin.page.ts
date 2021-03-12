import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
	selector: 'app-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {


	public pages = [

	{
		title: 'tools',
		url: 'admin/tools',
		icon: 'apps'
	},
	{
		title: 'users',
		url: 'admin/users',
		icon: 'people'
	},
	];
	public selectedIndex=0;

	constructor(
		public router:Router,
		) { }

	ngOnInit() {
	}
	selectTabNavigation(){
		const path = window.location.pathname;
		if (path !== undefined) {
			this.selectedIndex = this.pages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().split("/")[1]);
		}
	}
	redirectTo(url){
		console.log("redirectTo", url);
		this.router.navigate([url]);

	}

}
