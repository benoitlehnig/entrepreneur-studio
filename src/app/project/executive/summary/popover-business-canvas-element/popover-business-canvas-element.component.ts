import { Component, OnInit,Input } from '@angular/core';

@Component({
	selector: 'app-popover-business-canvas-element',
	templateUrl: './popover-business-canvas-element.component.html',
	styleUrls: ['./popover-business-canvas-element.component.scss'],
})
export class PopoverBusinessCanvasElementComponent implements OnInit {

	@Input() type; 
	@Input() item; 

	
	constructor() { }

	ngOnInit() {}

}
