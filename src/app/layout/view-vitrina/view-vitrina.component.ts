import { Component, OnInit } from '@angular/core';

import { Product } from '@shared/interface';
import { SearchService } from '@service/search.service';

@Component({
	selector: 'app-view-vitrina',
	templateUrl: './view-vitrina.component.html',
	styleUrls: ['./view-vitrina.component.css']
})
export class ViewVitrinaComponent implements OnInit {

	products: Product[] = [];

	constructor(
		private searchService: SearchService
	) { }

	ngOnInit(): void {
		this.getProductsFromSearch();
	}

	getProductsFromSearch(): void {
		this.searchService.makeSearch()
			.subscribe(products => this.products = products);
	}

}
