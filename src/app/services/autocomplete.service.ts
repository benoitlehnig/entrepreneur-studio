import { Injectable,Inject } from '@angular/core';
import {AutoCompleteService} from 'ionic4-auto-complete';

@Injectable({
	providedIn: 'root'
})
export class AutocompleteService {


	labelAttribute = 'full_name';
	public autoComplete = {
		'domains': [
		{
			code: '0',
			full_name: 'Administration, fonction publique',
		},
		{
			code: '1',
			full_name: 'Agroalimentaire',
		},
		{
			code: '2',
			full_name: 'Artisanat d\'art',
		},
		{
			code: '3',
			full_name: 'Associations',
		},
		{
			code: '4',
			full_name: 'Banques, assurances, services financiers',
		},
{
			code: '5',
			full_name: 'Chimie, plastique, conditionnement',
		},
{
			code: '6',
			full_name: 'Commerce de détail, grande distribution',
		},{
			code: '7',
			full_name: 'Communication, marketing, information',
		},
		{
			code: '8',
			full_name: 'Construction, bâtiment, travaux publics',
		},{
			code: '9',
			full_name: 'Culture, sports, loisirs',
		},{
			code: '10',
			full_name: 'Energie',
		},
		{
			code: '11',
			full_name: 'Enseignement, formation',
		},
		{
			code: '12',
			full_name: 'Environnement, récupération, tri, recyclage, traitement des déchets, matériaux, de l\'eau',
		},{
			code: '13',
			full_name: 'Equipement, matériel pour activités professionnelles',
		},{
			code: '14',
			full_name: 'Fabrication, commerce de gros d\'articles destinés à la vente',
		},{
			code: '15',
			full_name: 'Gestion, administration des entreprises',
		},{
			code: '16',
			full_name: 'Hôtellerie, restauration, tourisme',
		},{
			code: '17',
			full_name: 'Immobilier',
		},{
			code: '18',
			full_name: 'Industrie textile',
		},{
			code: '19',
			full_name: 'Informatique',
		},{
			code: '20',
			full_name: 'Ingénieurs d\'études et de recherche, chercheurs',
		},{
			code: '21',
			full_name: 'Logistique, transports',
		},{
			code: '22',
			full_name: 'Matériel électrique, électronique, optique',
		},{
			code: '23',
			full_name: 'Mécanique, métallurgie',
		},{
			code: '24',
			full_name: 'Minerais, minéraux, sidérurgie',
		},{
			code: '25',
			full_name: 'Professions juridiques',
		},{
			code: '26',
			full_name: 'Santé, action sociale',
		},{
			code: '27',
			full_name: 'Services aux particuliers, collectivités, entreprises',
		},
	
		]};

		constructor(@Inject(String) public type:string) {
		}

		getResults(keyword) {
			keyword = keyword.toLowerCase();
			return this.autoComplete[this.type].filter(
				(object) => {
					const value = object[this.labelAttribute].toLowerCase();

					return value.includes(keyword);
				}
				);
		}
	}
