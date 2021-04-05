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
		title: 'Tools',
		url: 'admin/tools',
		icon: 'apps'
	},
	{
		title: 'Categories',
		url: 'admin/categories',
		icon: 'bookmark'
	},
	{
		title: 'Users',
		url: 'admin/users',
		icon: 'people'
	},
	{
		title: 'Projects',
		url: 'admin/projects',
		icon: 'people'
	},
	{
		title: 'Statistics',
		url: 'admin/statistics',
		icon: 'stats-chart'
	},
	{
		title: 'Conseil',
		url: 'admin/conseil',
		icon: 'people-circle'
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
		this.router.navigate([url]);

	}
	isSelectedTab(url){
		if(this.router.url.indexOf(url.toLowerCase()) !==-1){
			return true
		}
		else{
			return false
		}
	}

}
