import { Component, OnInit,Input} from '@angular/core';
import { NavParams} from '@ionic/angular';





@Component({
	selector: 'app-menu-popover',
	templateUrl: './menu-popover.component.html',
	styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {

	@Input("homeref") value;
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
	constructor(
		public navParams: NavParams,


		) { }

	ngOnInit() {}

	dismiss(){
		this.navParams.get('homeref').dismissMenuPopover()

	}

}
