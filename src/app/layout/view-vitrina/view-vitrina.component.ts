import { Component, OnInit } from '@angular/core';

import { Product } from '@shared/interface';
import { SearchService, SearchResponse } from '@service/search.service';

@Component({
	selector: 'app-view-vitrina',
	templateUrl: './view-vitrina.component.html',
	styleUrls: ['./view-vitrina.component.css']
})
export class ViewVitrinaComponent implements OnInit {

	products: Product[] = [];
	totalProducts: number = 0;

	constructor(
		private searchService: SearchService
	) { }

	ngOnInit(): void {
		this.getProductsFromSearch();
	}

	getProductsFromSearch(): void {
		this.searchService.makeSearch().subscribe((res) => {
			this.products      = res.products;
			this.totalProducts = res.totalcount;
		});
	}

}
