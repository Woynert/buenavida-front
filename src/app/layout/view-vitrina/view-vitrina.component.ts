import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product, iEventApplyPriceFilter } from '@shared/interface';
import { SearchService, SearchResponse } from '@service/search.service';

import { CartService } from '@service/cart.service';

@Component({
	selector: 'app-view-vitrina',
	templateUrl: './view-vitrina.component.html',
	styleUrls: [
		'./view-vitrina.component.css',
		'./modal-product.css',
	]
})
export class ViewVitrinaComponent implements OnInit {

	searchTermSubscription: Subscription = Subscription.EMPTY;

	selectedProduct: Product | null = null;
	products    : Product[] = [];
	totalPages  : number  = 0;
	searchTerm  : string = "";
	selectedPage: number = 0;
	minPrice: number = 0;
	maxPrice: number = 1000;

	constructor(
		public searchService: SearchService,
		public cartService: CartService
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

	async addToFavorites(itemid: string) {
		await this.favoritesService.addToFavorites(itemid);
		await this.favoritesService.fetchUserInfo();
		this.matchFavorites();
	}

	async removeFromFavorites(itemid: string) {
		await this.favoritesService.removeFromFavorites(itemid);
		await this.favoritesService.fetchUserInfo();
		this.matchFavorites();
	}

	// tag some products as favorite

	matchFavorites() {

		if (!this.favoritesService.currentUser)
			return;

		const userInfo: iUserInfo = this.favoritesService.currentUser!;

		if (userInfo.favorites){

			// iterate products
			this.products.forEach((product: Product) => {
				product.favorite = userInfo.favorites.some((fav: Product) => {
					return (product._id == fav._id);
				});
			});
		}
		else{

			// iterate products
			this.products.forEach((product: Product) => {
				product.favorite = false;
			});
		}

	}

	addProduct (product: Product){
		this.cartService.addProduct(product,1);
	}

	// product modal

	selectProduct (product: Product){
		this.selectedProduct = product;

		// set quantity

		// check is already on cart
		// 		get quantity
		// else
		// 		quantity = 1
		//
	}

	deselectProduct (){
		this.selectedProduct = null;
	}

	

}
