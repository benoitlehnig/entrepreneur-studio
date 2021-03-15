import { Component, OnInit } from '@angular/core';
import {ToolService} from '../../services/tool.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.page.html',
	styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {


	public categoriesChangesSub: Subscription = new Subscription();
	public categories=[];


	public newCategory={
		labelFrench:""
	}
	public newCategoryId:number=0;

	constructor(
		public toolService:ToolService) { }

	ngOnInit() {

		this.categoriesChangesSub = this.toolService.getCategories().subscribe(
			data =>{
				console.log("categories", data)
				this.categories = data;
				this.newCategoryId =0;
				for(let i=0;i<this.categories.length;i++){
					if(Number(this.categories[i].id)> this.newCategoryId){
						this.newCategoryId = Number(this.categories[i].id);
					}
				}
				this.categories= this.categories.sort((n1,n2) => n1.labelFrench.localeCompare(n2.labelFrench));

				this.newCategoryId++;
			})

	}

	ngOnDestroy(){
		this.categoriesChangesSub.unsubscribe();
	}

	addCategory(){
		console.log("addCategory");
		this.toolService.addCategory(this.newCategory,this.newCategoryId);
	}
	updateCategory(category){
		console.log("category",category);
		const newCategory = {
			labelFrench:category.labelFrench
		}
		this.toolService.updateCategory(category.id,newCategory);

	}
}
