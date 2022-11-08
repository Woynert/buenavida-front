import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product, iEventApplyPriceFilter } from '@shared/interface';
import { SearchService, SearchResponse } from '@service/search.service';
import { FavoritesService } from '@service/favorites.service';

@Component({
	selector: 'app-view-vitrina',
	templateUrl: './view-vitrina.component.html',
	styleUrls: ['./view-vitrina.component.css']
})
export class ViewVitrinaComponent implements OnInit {

	searchTermSubscription: Subscription = Subscription.EMPTY;

	products    : Product[] = [];
	totalPages  : number  = 0;
	searchTerm  : string = "";
	selectedPage: number = 0;
	minPrice: number = 0;
	maxPrice: number = 1000;

	constructor(
		public searchService: SearchService,
		public favoritesService: FavoritesService
	) { }

	ngOnInit(): void {
		this.getProductsFromSearch();

		// get search term from topbar
		this.searchTermSubscription = this.searchService.searchTerm.subscribe(
			(term: string) => {
				this.searchTerm = term;
				this.selectedPage = 0;
				this.getProductsFromSearch();
			});
	}

	// make search

	getProductsFromSearch(): void {
		this.searchService.makeSearch(this.searchTerm, this.minPrice, this.maxPrice, this.selectedPage)
		.subscribe((res: SearchResponse) => {
			this.products      = res.products;
			this.totalPages    = Math.ceil(res.totalcount / 12); // 12 items per page
		});
	}

	// change selected page
	
	eventSelectPage(pageId: number) {
		this.selectedPage = pageId;
		this.getProductsFromSearch()
	}

	eventApplyPriceFilter(filter: iEventApplyPriceFilter) {
		this.minPrice = filter.minPrice;
		this.maxPrice = filter.maxPrice;
		this.selectedPage = 0;
		this.getProductsFromSearch();
	}

	// favorites

	addToFavorites(itemid: string) {
		this.favoritesService.addToFavorites(itemid);
		//let ok = await this.favoritesService.addToFavorites(itemid);
		//if (ok)
			//console.log("Added succesfully")
	}

}
