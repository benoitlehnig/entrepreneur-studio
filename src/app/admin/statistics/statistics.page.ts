import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {CMSService} from '../../services/cms.service'
@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.page.html',
	styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

	public statisticsChangesSub: Subscription = new Subscription();

	public statistics:any={
		communityMembersCount:0,
		conseilUsersCount:0,
		entrepreneurUsersCount:0,
		projectsCount:0,
		toolsCount:0
	};

	constructor(
		public CMSService:CMSService
		) { }

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.statisticsChangesSub = this.CMSService.getStatistics().subscribe(
			statistics =>{
				this.statistics = statistics;
			})
	}

	save(){
			this.CMSService.saveStatistics(this.statistics);
	}

	ionViewWillLeave(){
		this.statisticsChangesSub.unsubscribe();
	}

}
