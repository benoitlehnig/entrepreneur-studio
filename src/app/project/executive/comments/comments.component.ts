import { Component, OnInit,Input } from '@angular/core';
import { ProjectService} from '../../../services/project.service';
import { NavParams} from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

	@Input("homeref") value;
	@Input("projectId") projectId;
	public comments= [];
	public commentsSub: Subscription = new Subscription();


	constructor(
		public projectService:ProjectService,
		public navParams:NavParams
	) { }

	ngOnInit() {

		this.commentsSub = this.projectService.getComments(this.projectId).subscribe(
			data=> {
					this.comments = data;
					console.log("CommentsComponent", data);
			})

	}
	ngOnDestroy(){
		this.commentsSub.unsubscribe();
	}

	dismiss(){
		this.navParams.get('homeref').dismiss()
	}

}
