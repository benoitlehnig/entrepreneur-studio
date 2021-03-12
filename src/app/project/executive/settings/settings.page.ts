import { Component, OnInit,Input } from '@angular/core';
import {DataSharingServiceService} from '../../../services/data-sharing-service.service';
import {Project} from '../../../models/project';
import {Theme} from '../../../models/project';
import {AutocompleteService} from '../../../services/autocomplete.service';
import {StorageService} from '../../../services/storage.service';
import {AutoCompleteOptions} from 'ionic4-auto-complete';
import { FileUploader } from 'ng2-file-upload';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import {ProjectService} from '../../../services/project.service';
import {TranslateService} from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';



@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

	public project:Project = new Project();
	public projectId:string= "";

	public domainOptions:AutoCompleteOptions;

	public otherDomain= [];
	public selected = [];
	public providerDomains=null;
	public backgroundPictures=[];

	public domainItems=[];
	public domainSelectedItems=[];
	public domainDisplayedItems=[];

	public updateSuccessfullText:string="";

	public uploader:FileUploader;
	public hasBaseDropZoneOver:boolean;
	public hasAnotherDropZoneOver:boolean;
	public response:string;
	public fileToUpload: File;
	public maxFileSize = 300 * 300;  

	public projectSub: Subscription = new Subscription();

	constructor(
		public dataSharingServiceService: DataSharingServiceService,
		public storageService : StorageService,
		private functions: AngularFireFunctions,
		public angularFireAnalytics:AngularFireAnalytics,
		public projectService:ProjectService,
		public translateService:TranslateService,
		public toastController: ToastController,


		) { }

	ngOnInit() {
		this.translateService.get('ONBOARDINGPAGE.DomainItems').subscribe(
			value => {
				if(value){
					this.domainItems = this.returnArrary(value);
				}
			});
		this.translateService.get('SETTINGS.UpdateSuccessfull').subscribe(
			value => {
					this.updateSuccessfullText = value;
				
			})
		this.projectSub = this.dataSharingServiceService.getProjectChanges().subscribe(
			(data)=> {
				if(data){
					console.log("project data" , data)
					this.project = data.data;
					this.projectId = data.id;
					this.domainSelectedItems = this.project.domains;
					this.domainDisplayedItems = [];
					for(let i=0;i<this.project.domains.length;i++){
						this.domainDisplayedItems[this.project.domains[i].code] = true;
					}
					if(!this.project.theme){
						this.project.theme ={backgroundPictureId: '-1', backgroundPictureUrl:''};
					}
				}
			});

		this.angularFireAnalytics.setCurrentScreen("project_summary_popover");
		this.providerDomains = new AutocompleteService('domains'); 

		this.uploader = new FileUploader({

			disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
			formatDataFunctionIsAsync: true,
			maxFileSize: this.maxFileSize
		});
		this.uploader.onAfterAddingFile = (fileItem) => {
			fileItem.withCredentials = false;
			this.fileToUpload = fileItem._file;
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

			this.backgroundPictures = res.photo.results;
		});
	}
	ngOnDestroy(){
		this.projectSub.unsubscribe();
	}


	formatBytes(bytes, decimals?) {
		if (bytes == 0) return '0 Bytes';
		const k = 1024,
		dm = decimals || 2,
		sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	save(){
		this.projectService.saveProject(this.projectId,this.project).then(
			data=>{
				this.presentToast("success");
			})
	}

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

	uploadFile(){
		for(let i=0;i<this.uploader.getNotUploadedItems().length;i++){

			const mediaFolderPath = this.projectId+'/media/';
			let returnData = this.storageService.uploadFileAndGetMetadata(
				mediaFolderPath,
				this.fileToUpload,
				);

			returnData.downloadUrl$.subscribe(data=>{
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
	
	segmentChanged(event){
		this.project.sharingStatus = event.detail.value;
	}


	returnArrary(input){
		let arr=[];
		Object.keys(input).map(function(key){  
			arr.push({index: key, text:input[key]})  
			return arr;  
		});
		return arr 
	}

	domainChecked(event, domainItem){
		console.log(event,domainItem);
		if(event.detail.checked ===true){
			this.domainSelectedItems.push({code: domainItem.index,
				full_name: domainItem.text});
		}
		else{
			const index = this.domainSelectedItems.indexOf(domainItem, 0);
			if (index > -1) {
				this.domainSelectedItems.splice(index, 1);
			}
		}
		console.log(this.domainSelectedItems);
		this.project.domains= this.domainSelectedItems;
	}

	async presentToast(text) {
		const toast = await this.toastController.create({
			message: this.updateSuccessfullText,
			position:'top',
			duration: 2000
		});
		toast.present();
	}

}
