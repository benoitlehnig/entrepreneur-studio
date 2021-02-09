import { Component, OnInit,Input } from '@angular/core';
import { ProjectService} from '../../../services/project.service';
import {UserService} from '../../../services/user.service';
import { Subscription } from 'rxjs';
import {Comment} from '../../../models/project';
import * as moment from 'moment';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

	@Input("homeref") value;
	@Input("projectId") projectId;
	@Input("userIds") userIds;
	public comments= [];
	public commentsSub: Subscription = new Subscription();
	public newCommentText:string="";
	public users=[];

	constructor(
		public projectService:ProjectService,
		public userService:UserService,
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
	}

	getFromNowTime(date){
		return moment(date).fromNow();
	}
	addComment(){
		let comment = new Comment();
		comment.uid = this.userIds.uid;
		comment.status = "received";
		comment.createdBy = this.userIds.email;
		comment.source ="ES";
		comment.createdAt = moment().toDate();
		comment.text = this.newCommentText;
		this.projectService.addComment(this.projectId,JSON.parse(JSON.stringify(comment))).then(
			()=>{
				this.newCommentText ="";
			})
	}

	
}
