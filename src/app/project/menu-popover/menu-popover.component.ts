import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-menu-popover',
	templateUrl: './menu-popover.component.html',
	styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {


	public pages = [

	{
		title: 'Le Garage',
		url: '/entrepreneur',
		icon: 'layers'
	},
	{
		title: 'La Boite à Outils',
		url: 'intl/fr/tools',
		icon: 'construct'
	},
	];
	constructor() { }

	ngOnInit() {}

}
