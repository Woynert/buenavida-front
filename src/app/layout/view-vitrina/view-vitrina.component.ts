import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product, iEventApplyPriceFilter } from '@shared/interface';
import { SearchService, SearchResponse } from '@service/search.service';

@Component({
	selector: 'app-view-vitrina',
	templateUrl: './view-vitrina.component.html',
	styleUrls: ['./view-vitrina.component.css']
})
export class ViewVitrinaComponent implements OnInit {

	products: Product[] = [];
	
	//initialPage: number = 0;
	totalPages: number  = 0;

	searchTermSubscription: Subscription = Subscription.EMPTY;
	searchTerm: string = "";
	selectedPage: number = 0;
	minPrice: number = 0;
	maxPrice: number = 1000;

	constructor(
		public searchService: SearchService
	) { }

	ngOnInit(): void {
		this.getProductsFromSearch();

		this.searchTermSubscription = this.searchService.searchTerm.subscribe(
			(term: string) => {
				this.searchTerm = term;
				this.selectedPage = 0;
				this.getProductsFromSearch();
			});
	}

	getProductsFromSearch(): void {
		this.searchService.makeSearch(this.searchTerm, this.minPrice, this.maxPrice, this.selectedPage)
		.subscribe((res: SearchResponse) => {
			this.products      = res.products;
			this.totalPages    = Math.ceil(res.totalcount / 12); // 12 items per page
			console.log(this.totalPages);
		});
	}
	
	eventSelectPage(pageId: number) {
		console.log("sel ", pageId)
		this.selectedPage = pageId;

		this.getProductsFromSearch()
	}

	eventApplyPriceFilter(filter: iEventApplyPriceFilter) {
		console.log("may", filter);
		this.minPrice = filter.minPrice;
		this.maxPrice = filter.maxPrice;
		this.selectedPage = 0;

		this.getProductsFromSearch();
	}


}
