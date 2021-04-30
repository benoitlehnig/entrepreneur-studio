import { Component, OnInit,ViewChild  } from '@angular/core';
import { CMSService} from '../services/cms.service';
import { UserService} from '../services/user.service';
import { ToolService} from '../services/tool.service';
import {TranslateService} from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import {DataSharingServiceService} from '../services/data-sharing-service.service';
import { ModalController } from '@ionic/angular';
import { AddToolComponent } from './add-tool/add-tool.component';
import { LoginComponent } from '../landing-page/login/login.component';
import { SignUpComponent } from '../landing-page/sign-up/sign-up.component';
import { Platform } from '@ionic/angular';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { SharePopoverComponent } from './share-popover/share-popover.component';
import { ActionSheetController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-tools',
	templateUrl: './tools.page.html',
	styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {

	public tools = [];
	public displayedTools=[];
	public numberofTools:number=83;
	public isLogged:boolean=false;

	public items = [];
	public categories = [];
	public filter={
		categories : [],
		stages:[],
		productName:""
	}
	public stages = [];
	public side ="bottom";
	public loadingOngoing:boolean=false;
	public stageExpanded:boolean=false;
	public categoryExpanded:boolean=false;
	public uid=null;
	public likedTools=[];
	public width=0;
	public viewMode:string='grid';
	
	public categoriesChangesSub: Subscription = new Subscription();



	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


	constructor(
		public CMSService:CMSService,
		public toolService:ToolService,
		public userService:UserService,
		public translateService : TranslateService,
		public dataSharingServiceService : DataSharingServiceService,
		public modalController:ModalController,
		public popoverController:PopoverController,
		public actionSheetController: ActionSheetController,

		public platform: Platform,
		public angularFireAnalytics:AngularFireAnalytics
		)
	{
		console.log("ToolsPage >> constructor");
	}

	async ngOnInit() {
		console.log("ToolsPage >> ngOnInit");
		this.getTools();
		
		this.width = this.platform.width();
		console.log("width", this.width)
		if(this.platform.width() <768){
			this.side ="start";
			this.viewMode = 'list';
		}

		this.categoriesChangesSub = await this.toolService.getCategories().subscribe(
			data =>{
				console.log("categories", data)
				this.categories = data;
				this.categories = this.categories.sort((n1,n2) => n1.labelFrench.localeCompare(n2.labelFrench));
			}
			);

		this.translateService.get('TOOLS.STAGES').subscribe(
			data=>{
				let arr=[];
				Object.keys(data).map(function(key){  
					arr.push({id: key, name:data[key]})  
					return arr;  
				}); 
				arr= arr.sort((n1,n2) => n1.name.localeCompare(n2.name));
				this.stages = arr;
			})
		this.dataSharingServiceService.getUidChanges().subscribe(
			uid=>{
				(uid ===-1)? this.isLogged = false : this.isLogged = true;
				this.uid= uid;
				if(this.uid !==null){
					this.userService.getLikedTools(this.uid.uid).subscribe(
						likedTools =>{
							this.likedTools = likedTools;
							console.log("likedTools", this.likedTools)
						}
						)
				}
			})

		this.CMSService.getStatistics().pipe(first()).subscribe( (data:any)=>{
			this.numberofTools = data.toolsCount;
		})
	}

	ngOnDestroy(){
		this.categoriesChangesSub.unsubscribe();
	}
	

	requestAddTool(){
		console.log("requestAddTool", this.isLogged);
		(this.isLogged ===true)? this.presentAddToolPopover() : this.presentLoginPopover();

	}
	getTools(){
		this.angularFireAnalytics.logEvent('tool_searched',  {search_term:this.filter.productName,
			search_categories: JSON.stringify(this.filter.categories), search_stages: JSON.stringify(this.filter.stages)});

		this.loadingOngoing = true;
		this.displayedTools = [];
		this.CMSService.retrieveToolsContent(this.filter).pipe(first()).subscribe(
			data=>{
				if(data !==null){
					this.tools = data.sort((n1,n2) => n1.name.localeCompare(n2.name));
					this.displayedTools = this.tools.slice(0, 20)
					this.loadingOngoing = false;
					console.log("retrieveToolsContent",this.tools);
				}
			});

	}
	async presentLoginPopover() {
		this.angularFireAnalytics.logEvent('page_view', {page_path: '/tools/login',  page_title: 'login'});
		const popover = await this.modalController.create({
			component: LoginComponent,
			componentProps:{homeref:this, reason:"ToolAccess"},
			cssClass: 'onboardingPopup',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissLoginPopover(){
		this.modalController.dismiss();
	}


	async presentSignUpPopover(){
		this.angularFireAnalytics.logEvent('page_view', {page_path: '/tools/sign_up',  page_title: 'sign_up'});
		const popover = await this.modalController.create({
			component: SignUpComponent,
			componentProps:{homeref:this, reason:"ToolAccess"},
			cssClass: 'onboardingPopup',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissSignUpPopover(){
		this.modalController.dismiss();
	}


	async presentAddToolPopover() {
		this.angularFireAnalytics.logEvent('page_view', {page_path: '/tools',  page_title: 'add_tool'});
		const popover = await this.modalController.create({
			component: AddToolComponent,
			componentProps:{homeref:this},
			cssClass: 'onboardingPopup',
			backdropDismiss: true,
		});
		return await popover.present();
	}
	dismissAddToolPopover(){
		this.modalController.dismiss();
	}


	expandStage(){
		this.stageExpanded = !this.stageExpanded;

	}
	expandCategory(){
		this.categoryExpanded = !this.categoryExpanded;
	}

	selectFilter(type,filter,event){
		if(type ==='stage'){
			if(event.detail.checked ===true){
				this.filter.stages.push(filter.id);
			}
			else{
				this.filter.stages.splice(this.filter.stages.indexOf(filter.id), 1);
			}

		}
		if(type ==='category'){
			if(event.detail.checked ===true){
				this.filter.categories.push(filter.id);
			}
			else{
				this.filter.categories.splice(this.filter.categories.indexOf(filter.id), 1);

			}
		}
		this.getTools();
	}

	clickTool(tool){
		this.angularFireAnalytics.logEvent('tool_clicked',  {name: tool.name});
	}
	like(index,tool){
		if(this.isToolLiked(tool) ===false){
			this.userService.likeTool(this.uid.uid,tool);
			this.angularFireAnalytics.logEvent('tool_liked',  {name: tool.name});

			if(this.tools[index].likes !== undefined){
				this.tools[index].likes = Number(this.tools[index].likes) +1;
			}
			else{
				this.tools[index].likes =1;
			}
		}
		else{
			this.userService.unlikeTool(this.uid.uid,tool);
			this.angularFireAnalytics.logEvent('tool_unliked',  {name: tool.name});

			if(this.tools[index].likes !== undefined){
				this.tools[index].likes = Number(this.tools[index].likes) - 1;
				if(this.tools[index].likes <0){
					this.tools[index].likes = 0;
				}
			}
			else{
				this.tools[index].likes  =0;
			}
		}
	}
	
	isToolLiked(tool){
		let toolLiked=false;
		const index = this.likedTools.findIndex((x) => x === tool.id);
		if(index !==-1){
			toolLiked = true;
		}
		return toolLiked;
	}

	async openSharePopover(ev: any,tool){
		this.angularFireAnalytics.logEvent('page_view', {page_path: '/tools/share',  page_title: 'share_tool'});

		if(this.platform.width() >768){
			const popover = await this.popoverController.create({
				component: SharePopoverComponent,
				componentProps:{homeref:this, tool:tool,fullSCreen:false},
				showBackdrop:true,
				cssClass: 'sharePopoverComponent',
				event:ev,

			});
			return await popover.present();
			
		}
		else{
			const popover = await this.modalController.create({
				component: SharePopoverComponent,
				componentProps:{homeref:this, tool:tool,fullSCreen:true},
				cssClass: 'registerPopover',
				backdropDismiss: true,
			});
			return await popover.present();
		}
	}

	dismissOpenSharePopover(){
		this.popoverController.dismiss();
	}
	dismissOpenShareModal(){
		this.modalController.dismiss();
	}
	areToolsAllDisplayed(){
		return (this.displayedTools.length === this.tools.length);
	}
	loadData(event){
		setTimeout(() => {
			if(this.displayedTools.length <= this.tools.length){
				event.target.disabled = false;
				this.displayedTools = this.tools.splice(0,this.displayedTools.length+20);
				event.target.complete();
			}
			else{
				event.target.disabled = true;
			}
			
		}, 500);
	}

	toggleViewMode(viewMode){
		this.angularFireAnalytics.logEvent('tool_view_swapped',  {viewMode: viewMode});
		this.viewMode = viewMode;
	}

	getCategoryLabel(id){
		const categoryLabels:any = this.categories.filter(
			function(data){ return data.id == id }
			)
		if(categoryLabels.length>0){
			return categoryLabels[0].labelFrench
		}
	}
}
