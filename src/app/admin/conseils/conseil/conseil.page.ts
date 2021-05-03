import { Component, OnInit,NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';



import {Conseil} from '../../../models/conseil';
import {ConseilService} from '../../../services/conseil.service';

@Component({
	selector: 'app-conseil',
	templateUrl: './conseil.page.html',
	styleUrls: ['./conseil.page.scss'],
})
export class ConseilPage implements OnInit {


	public conseil: Conseil = new Conseil();
	public conseilId:string=""

	public mode="update";

	public GoogleAutocomplete: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService();
	public geocoder = new google.maps.Geocoder;
	public autocomplete: { input: string; } = { input: '' };;
	public autocompleteItems: any[]=[];
	public location: any;

	public conseilChangesSub: Subscription = new Subscription();

	constructor(
		public conseilService: ConseilService,
		private activatedRoute: ActivatedRoute,
		public router:Router,
		public translateService : TranslateService,
		public alertController : AlertController,
				public zone: NgZone,
) { }


	ngOnInit() {

	}
	ionViewWillEnter(){
		let mode = this.activatedRoute.snapshot.paramMap.get('mode');
		if(mode ==='add'){
			this.mode = "add";
		}
		else{
			this.conseilId = this.activatedRoute.snapshot.paramMap.get('id');
			this.conseilChangesSub = this.conseilService.getConseil(this.conseilId).subscribe(data=>{
				console.log("getConseil",data);
				this.conseil= data;
			})
		}
	
		
		
		
	}
	ionViewWillLeave(){
		this.conseilChangesSub.unsubscribe();
	}

	save(){
		console.log("save" , this.conseil);
		
		if(this.mode ==='update'){
			this.conseilService.save(this.conseilId,this.conseil)
		}
		else{

			this.conseilService.add(JSON.parse(JSON.stringify(this.conseil)));
			this.router.navigate(['/admin/conseils']);
		}

	}
	delete(){
		this.conseilService.delete(this.conseilId);
		this.router.navigate(['/admin/tools']);

	}
	async requestDelete(){
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Supprimer '+this.conseil.name,
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: (blah) => {
					console.log('Confirm Cancel: blah');
				}
			}, {
				text: 'Okay',
				handler: () => {
					this.delete()
				}
			}
			]		});

		await alert.present();
	}

	updateSearchResults(){
		if (this.autocomplete.input == '') {
			this.autocompleteItems = [];
			return;
		}

		this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input,  componentRestrictions: {country: 'fr'}, types: ['address'] },
			(predictions, status) => {
				this.autocompleteItems = [];
				this.zone.run(() => {
					predictions.forEach((prediction) => {
						this.autocompleteItems.push(prediction);
					});
				});
			});
	}


	selectSearchResult(item) {
		this.location = item;
		this.conseil.googleAddress = this.location.description;
		this.geocoder.geocode({address:this.location.description}, (results, status)=>{
			let address= this.getAddressObject(results[0].address_components);
			this.conseil.street_number = address.home;
			this.conseil.street_address = address.street;
			this.conseil.region = address.region;
			this.conseil.city = address.city;
			this.conseil.country = address.country;
			this.conseil.postal_code = address.postal_code;
		})
		this.autocomplete = { input: this.conseil.googleAddress};
		this.autocompleteItems = [];
	}

	getAddressObject(address_components) {
		var ShouldBeComponent = {
			home: ["street_number"],
			postal_code: ["postal_code"],
			street: ["street_address", "route"],
			region: [
			"administrative_area_level_1",
			"administrative_area_level_2",
			"administrative_area_level_3",
			"administrative_area_level_4",
			"administrative_area_level_5"
			],
			city: [
			"locality",
			"sublocality",
			"sublocality_level_1",
			"sublocality_level_2",
			"sublocality_level_3",
			"sublocality_level_4"
			],
			country: ["country"]
		};

		var address = {
			home: "",
			postal_code: "",
			street: "",
			region: "",
			city: "",
			country: ""
		};
		address_components.forEach(component => {
			for (var shouldBe in ShouldBeComponent) {
				if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {

					address[shouldBe] = component.long_name;

				}
			}
		});
		return address;
	} 




}
