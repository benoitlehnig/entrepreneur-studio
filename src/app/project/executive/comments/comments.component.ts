import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ProjectService} from '../../../services/project.service';
import {UserService} from '../../../services/user.service';
import { Subscription } from 'rxjs';
import {Comment} from '../../../models/project';
import * as moment from 'moment';
import { CommentPopoverComponent } from './comment-popover/comment-popover.component';
import { PopoverController } from '@ionic/angular';
import { NavParams} from '@ionic/angular';
import { AngularFireAnalytics } from '@angular/fire/analytics';



@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

	@Input("homeref") value;
	@Input("projectId") projectId;
	@Input("userIds") userIds;
	@Input("origin") origin;


	@Output()
	closed = new EventEmitter<string>();

	public comments= [];
	public commentsSub: Subscription = new Subscription();
	public newCommentText:string="";
	public users=[];

	constructor(
		public projectService:ProjectService,
		public userService:UserService,
		public popoverController: PopoverController,
		public navParams: NavParams,
		public angularFireAnalytics:AngularFireAnalytics


		) { }

	ngOnInit() {

		this.commentsSub = this.projectService.getCommentsWithUserInfo(this.projectId).subscribe(
			data=> {
				this.comments = data;
				console.log("CommentsComponent", data);				
			})

	}
	ngOnDestroy(){
		this.commentsSub.unsubscribe();
	}

	dismissCommentsPopover(){
		this.closed.emit();
		if(this.origin ==='mainMenu'){

			this.navParams.get('homeref').dismissCommentsPopover();
		}

	}

	getFromNowTime(date){
		return moment(date).fromNow();
	}
	addComment(){
		this.angularFireAnalytics.logEvent('project_add_comment',  {projectId:this.projectId});

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
	resolve(commentId){
		this.projectService.setCommentStatus(this.projectId,commentId,"resolved");
		this.dismissCommentPopover();
	}
	markAsImportant(commentId){
		this.projectService.setCommentStatus(this.projectId,commentId,"important");
		this.dismissCommentPopover();
	}
	delete(commentId){
		this.projectService.deleteComment(this.projectId,commentId);
		this.dismissCommentPopover();
	}


	async presentCommentPopover(ev: any, commentId) {
		const popover = await this.popoverController.create({
			component: CommentPopoverComponent,
			componentProps: {homeref:this, commentId:commentId},
			event: ev,
			translucent: true,
			showBackdrop:false
		});
		return await popover.present();
	}
	dismissCommentPopover(){
		this.popoverController.dismiss();
	}

	
}
