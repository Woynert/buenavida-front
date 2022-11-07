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
	
	initialPage: number = 0;
	totalPages: number  = 0;

	constructor(
		public searchService: SearchService
	) { }

	ngOnInit(): void {
		this.getProductsFromSearch();
	}

	getProductsFromSearch(): void {
		this.searchService.makeSearch().subscribe((res: SearchResponse) => {
			this.products      = res.products;
			this.totalPages    = Math.ceil(res.totalcount / 12); // 12 items per page
		});
	}

}
