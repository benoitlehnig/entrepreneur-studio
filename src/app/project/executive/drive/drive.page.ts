import { Component, OnInit } from '@angular/core';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import { Subscription } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import {ProjectService} from '../../../services/project.service';
import { first } from 'rxjs/operators';



@Component({
	selector: 'app-drive',
	templateUrl: './drive.page.html',
	styleUrls: ['./drive.page.scss'],
})
export class DrivePage implements OnInit {

	public projectId:string="";

	public projectSub: Subscription = new Subscription();

	public driveFolderId:string="";
	public driveFiles=[];
	public driveFolders=[];
	public currentFolder = null;

	constructor(
		public dataSharingServiceService: DataSharingServiceService,
		private functions: AngularFireFunctions,
		private projectService: ProjectService,

		) { }

	ngOnInit() {}

	ionViewWillEnter(){

		this.projectSub = this.dataSharingServiceService.getProjectChanges().pipe(first()).subscribe(
			(data)=>{
				if(data !==null){
					console.log("DrivePage dataSharingServiceService", data);
					this.projectId	= data.id;
					this.getFolderId();
					this.initDrive(null)
				}
				else{
					//todo
				}
			});
	}


	ionViewWillLeave(){
		this.projectSub.unsubscribe();
	}

	initDrive(folderId){
		this.driveFolders = [];
		this.driveFiles = [];
		const callable = this.functions.httpsCallable('driveListFiles');
		let obs = callable({projectId:this.projectId});

		if(folderId!==null){
				obs = callable({projectId:this.projectId,folderId:folderId });

		}
		else{
			this.currentFolder =null;
		}
		obs.subscribe(async res => {
			console.log("driveListFiles ", res)
			for(let i=0;i<res.length;i++){
				if(res[i].mimeType ==='application/vnd.google-apps.folder'){
					this.driveFolders.push(res[i]);	
				}
				else{
					this.driveFiles.push(res[i])
				}
			}
		});

	}

	getFolderId(){
		this.projectService.getGoogleDriveSettings(this.projectId).subscribe(
			(settings:any)=>{
				this.driveFolderId = settings.folderId
			})
	}
	navigateTo(url){
		window.open(url);
	}

	navigateToFolder(file){
		this.currentFolder = file;
		console.log("navigateToFolder", file);
		this.initDrive(file.id)
	
	}

}
