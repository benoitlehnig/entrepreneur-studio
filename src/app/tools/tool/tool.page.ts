import { Component, OnInit, Input } from '@angular/core';
import { Tool} from '../../models/tool';

@Component({
	selector: 'app-tool',
	templateUrl: './tool.page.html',
	styleUrls: ['./tool.page.scss'],
})
export class ToolPage implements OnInit {

	constructor() { }

	@Input() tool:Tool = new Tool(); 
	@Input() mode:string="view"; 
	ngOnInit() {
	}

}
