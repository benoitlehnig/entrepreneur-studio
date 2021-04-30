import { Component, OnInit,NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

import { AngularFireFunctions } from '@angular/fire/functions';


import {User} from '../../models/user';
import {Conseil} from '../../models/conseil';
import {ConseilService} from '../../services/conseil.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';


@Component({
	selector: 'app-referencing',
	templateUrl: './referencing.page.html',
	styleUrls: ['./referencing.page.scss'],
})
export class ReferencingPage implements OnInit {

	constructor(
		public userService:UserService,
		public authService:AuthService,
		public conseilService:ConseilService,
		public zone: NgZone,
		public translateService : TranslateService,
		public functions:AngularFireFunctions,		

		) { }



	public GoogleAutocomplete: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService();
	public geocoder = new google.maps.Geocoder;
	public autocomplete: { input: string; } = { input: '' };;
	public autocompleteItems: any[]=[];
	public location: any;

	public conseilTypes=[];

	public userIds ;
	public user:User = new User();
	public conseil: Conseil = new Conseil();

	public userChangesSub: Subscription = new Subscription();

	public userDetailsChangesSub: Subscription = new Subscription();
	public conseilChangesSub: Subscription = new Subscription();

	ngOnInit() {

	}

	ionViewWillEnter(){
		this.conseil = new Conseil();
		this.userChangesSub = this.authService.getUserDetails().subscribe(
			data => {
				if(data){
					this.userIds= data;
					this.userDetailsChangesSub = this.userService.getUserDetails(this.userIds.uid).subscribe(
						user=>{
							if(user){
								this.user=user;
								console.log("userDetailsChangesSub user", this.user)
								if(user.conseilCMSID !==undefined ){
									this.conseilChangesSub = this.conseilService.getConseil(this.user.conseilCMSID).subscribe(data=>{
										this.conseil= data;
										this.autocomplete.input = data.googleAddress;
							console.log("ionViewWillEnter conseil", this.conseil)

									});
								}
							}

						})
				}
			});
		this.translateService.get('CONSEIL.TYPES').subscribe(
			value => {
				this.conseilTypes= this.returnArrary(value);
			})
		console.log("conseil will enter", this.conseil)
	}

	ionViewWillLeave(){
		this.userChangesSub.unsubscribe();
		this.userDetailsChangesSub.unsubscribe();
		this.conseilChangesSub.unsubscribe();

	}
	returnArrary(input){
		let arr=[];
		Object.keys(input).map(function(key){  
			arr.push({index: key, text:input[key]})  
			return arr;  
		});
		return arr 
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

	save(){
		console.log("Conseil >> save >> ", this.conseil);
		if(this.conseil.name !=="" && this.conseil.description !=="" && this.conseil.webLinkUrl !="" && this.conseil.googleAddress !==""){
			console.log("Conseil >> save good >> ", this.conseil);
			if(this.user.conseilCMSID ===null ||this.user.conseilCMSID === undefined ){
				const callable = this.functions.httpsCallable('createConseilFromUser');
					const obs = callable(this.conseil);
					obs.subscribe(res => {
						console.log("createConseilFromUser", res)
					});	
			}
			else{
				this.conseilService.save(this.user.conseilCMSID,this.conseil)

			}
		}
		else{
			console.log("Conseil >> save bad >> ", this.conseil);

		}
		
	}

}
