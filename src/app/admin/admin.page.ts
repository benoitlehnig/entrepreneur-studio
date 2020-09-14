import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {


	public pages = [

	{
		title: 'tools',
		url: 'tools',
		icon: 'hammer'
	}
	];
	public selectedIndex=0;

	constructor() { }

	ngOnInit() {
	}
	selectTabNavigation(){
		const path = window.location.pathname;
		if (path !== undefined) {
			this.selectedIndex = this.pages.findIndex(page => page.url.toLowerCase() === path.toLowerCase().split("/")[1]);
		}
	}

}
