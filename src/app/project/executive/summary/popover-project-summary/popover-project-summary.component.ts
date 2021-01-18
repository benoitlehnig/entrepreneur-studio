import { Component, OnInit,Input } from '@angular/core';
import {DataSharingServiceService} from '../../../../services/data-sharing-service.service';
import {Project} from '../../../../models/project';
import {Theme} from '../../../../models/project';
import { NavParams} from '@ionic/angular';
import {AutocompleteService} from '../../../../services/autocomplete.service';
import {StorageService} from '../../../../services/storage.service';
import {AutoCompleteOptions} from 'ionic4-auto-complete';
import { FileUploader } from 'ng2-file-upload';
import { AngularFireFunctions } from '@angular/fire/functions';


@Component({
	selector: 'app-popover-project-summary',
	templateUrl: './popover-project-summary.component.html',
	styleUrls: ['./popover-project-summary.component.scss'],
})
export class PopoverProjectSummaryComponent implements OnInit {

	public project:Project = new Project();
	public projectId:string= "";
	@Input("homeref") value;

	public domainOptions:AutoCompleteOptions;

	public otherDomain= [];
	public selected = [];
	public providerDomains=null;
	public backgroundPictures=[];

	public uploader:FileUploader;
	public hasBaseDropZoneOver:boolean;
	public hasAnotherDropZoneOver:boolean;
	public response:string;
	public fileToUpload: File;
	public maxFileSize = 300 * 300;  

	constructor(
		public dataSharingServiceService: DataSharingServiceService,
		public navParams : NavParams,
		public storageService : StorageService,
		private functions: AngularFireFunctions,


		) {
		this.providerDomains = new AutocompleteService('domains'); 

		this.uploader = new FileUploader({

			disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
			formatDataFunctionIsAsync: true,
			maxFileSize: this.maxFileSize
		});
		this.uploader.onAfterAddingFile = (fileItem) => {
			fileItem.withCredentials = false;
			this.fileToUpload = fileItem._file;
			console.log(fileItem); // fileItem is the file object
		};

		this.uploader.onWhenAddingFileFailed = (item, filter) => {
			let message = '';
			switch (filter.name) {
				case 'fileSize':
				message = 'Warning ! \nThe uploaded file \"' + item.name + '\" is ' + this.formatBytes(item.size) + ', this exceeds the maximum allowed size of ' + this.formatBytes(this.maxFileSize);
				break;
				default:
				message = 'Error trying to upload file '+item.name;
				break;
			}

			alert(message);
		};

		const callable = this.functions.httpsCallable('getBackgroundPictures');
			const obs = callable({});
			obs.subscribe(async res => {
				console.log(" getBackgroundPictures >> ", res);
				console.log(res.photo.results)
				this.backgroundPictures = res.photo.results;
			});
	}


	formatBytes(bytes, decimals?) {
		if (bytes == 0) return '0 Bytes';
		const k = 1024,
		dm = decimals || 2,
		sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	ngOnInit() {
		this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=> {
				if(data){
					this.project = data.data;
					this.projectId = data.id;
					if(!this.project.theme){
						this.project.theme ={backgroundPictureId: '-1', backgroundPictureUrl:''};
					}
				}
			});
	}

	save(){
		this.navParams.get('homeref').saveProject(this.project);
	}

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

	uploadFile(){
		for(let i=0;i<this.uploader.getNotUploadedItems().length;i++){
			console.log(this.uploader.getNotUploadedItems()[i]);
			console.log(this.fileToUpload)
			const mediaFolderPath = this.projectId+'/media/';
			let returnData = this.storageService.uploadFileAndGetMetadata(
				mediaFolderPath,
				this.fileToUpload,
				);

			returnData.downloadUrl$.subscribe(data=>{
				console.log(data);
				this.project.summary.logoUrl = data;
			});
		}
	}

	selectBackgroundPicture(backgroundPicture){
		console.log("selectBackgroundPicture >>", backgroundPicture );
		let theme: Theme = new Theme();
		theme.backgroundPictureUrl= backgroundPicture.urls.regular; 
		theme.backgroundPictureId= backgroundPicture.id; 
		this.project.theme = theme; 
	}
	dismiss(){
		this.navParams.get('homeref').dismiss();
	}
	segmentChanged(event){
		console.log("sharingStatus,", event);
		this.project.sharingStatus = event.detail.value;
	}

}
