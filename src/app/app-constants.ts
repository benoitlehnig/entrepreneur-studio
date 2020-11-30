import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class AppConstants {
	
	public businessCanvasStatic={
		'Problem':{
			'img':'https://image.freepik.com/free-photo/puzzled-thoughtful-male-student-dressed-light-blue-shirt-holding-hand-his-chin-frowning-face-looking-upwards-being-dissatisfied-with-problems-university-thinking-his-mistakes_176420-13278.jpg',
			'title': 'BusinessCanvasProblemTitle',
			'subTitle': 'BusinessCanvasProblemSubTitle',
			'guidance': 'BusinessCanvasProblemGuidance',
			'example': 'BusinessCanvasProblemExample'
		},
		'ExistingAlternatives':{
			'img':'https://image.freepik.com/free-photo/diet-dieting-concept-healthy-useful-food-beautiful-young-woman-choosing-fruits_155003-13438.jpg',
			'title': 'BusinessCanvasExistingAlternativesTitle',
			'subTitle': 'BusinessCanvasExistingAlternativesSubTitle',
			'guidance': 'BusinessCanvasExistingAlternativesGuidance',
			'example': 'BusinessCanvasExistingAlternativesExample'
		},
		'Solution':{
			'img':'https://image.freepik.com/free-photo/businessman-with-light-bulb-his-hand_1232-892.jpg',
			'title': 'BusinessCanvasSolutionTitle',
			'subTitle': 'BusinessCanvasSolutionSubTitle',
			'guidance': 'BusinessCanvasSolutionGuidance',
			'example': 'BusinessCanvasSolutionExample'
		},
		'KeyMetrics':{
			'img':'https://image.freepik.com/free-vector/dashboard-background-with-color-signals_1284-1152.jpg',
			'title': 'BusinessCanvasSolutionTitle',
			'subTitle': 'BusinessCanvasSolutionSubTitle',
			'guidance': 'BusinessCanvasSolutionGuidance',
			'example': 'BusinessCanvasSolutionExample'
		},
		'Usp':{
			'img':'https://image.freepik.com/free-photo/plant-growing-from-coins_23-2147931177.jpg',
			'title': 'BusinessCanvasUniqueValuePropositionTitle',
			'subTitle': 'BusinessCanvasUniqueValuePropositionSubTitle',
			'guidance': 'BusinessCanvasUniqueValuePropositionGuidance',
			'example': 'BusinessCanvasUniqueValuePropositionExample'
		},
		'UnfairAdvantage':{
			'img':'https://image.freepik.com/free-photo/plant-growing-from-coins_23-2147931177.jpg',
			'title': 'BusinessCanvasUniqueValuePropositionTitle',
			'subTitle': 'BusinessCanvasUniqueValuePropositionSubTitle',
			'guidance': 'BusinessCanvasUniqueValuePropositionGuidance',
			'example': 'BusinessCanvasUniqueValuePropositionExample'
		},
		'Channels':{
			'img':'https://image.freepik.com/free-photo/womans-hand-sticking-notepapers-white-wooden-board_1387-523.jpg',
			'title': 'BusinessCanvasChannelsTitle',
			'subTitle': 'BusinessCanvasChannelsSubTitle',
			'guidance': 'BusinessCanvasChannelsGuidance',
			'example': 'BusinessCanvasChannelsExample'
		},
		'CustomerSegmentation':{
			'img':'https://image.freepik.com/free-photo/multiracial-group-young-people-taking-selfie_1139-1032.jpg',
			'title': 'BusinessCanvasCustomerSegmentationTitle',
			'subTitle': 'BusinessCanvasCustomerSegmentationSubTitle',
			'guidance': 'BusinessCanvasCustomerSegmentationGuidance',
			'example': 'BusinessCanvasCustomerSegmentationExample'
		},
		'CostStructure':{
			'img':'https://image.freepik.com/free-photo/concept-economy-with-piggy-bank-calculator_23-2148525309.jpg',
			'title': 'BusinessCanvasCostStructureTitle',
			'subTitle': 'BusinessCanvasCostStructureSubTitle',
			'guidance': 'BusinessCanvasCostStructureGuidance',
			'example': 'BusinessCanvasCostStructureExample'
		},
		'RevenueStreams':{
			'img':'https://image.freepik.com/free-photo/businessman-s-hand-form-mime-extract-money-from-tablet-pc_155003-268.jpg',
			'title': 'BusinessCanvasRevenueStreamsTitle',
			'subTitle': 'BusinessCanvasRevenueStreamsSubTitle',
			'guidance': 'BusinessCanvasRevenueStreamsGuidance',
			'example': 'BusinessCanvasRevenueStreamsExample'
		}
	};
	public emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

	public applicationFavicons=
	{
		'trello.com': 'https://trello.com/favicon.ico',
		'app.slack.com': 'https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png',
		'app.mural.co': 'https://app.mural.co/static/favicon-32x32.png'
	}
}
