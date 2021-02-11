import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';


@Component({
	selector: 'app-comment-popover',
	templateUrl: './comment-popover.component.html',
	styleUrls: ['./comment-popover.component.scss'],
})
export class CommentPopoverComponent implements OnInit {

	constructor(
		public navParams: NavParams,
		) {
	}

	@Input("homeref") value;
	@Input("commentId") commentId;

	ngOnInit() {}

	resolve(){
		this.navParams.get('homeref').resolve(this.commentId);
	}
	markAsImportant(){
		this.navParams.get('homeref').markAsImportant(this.commentId);
	}
	delete(){
		this.navParams.get('homeref').delete(this.commentId);

	}

}
