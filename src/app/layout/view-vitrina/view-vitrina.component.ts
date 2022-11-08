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

	searchTermSubscription: Subscription = Subscription.EMPTY;

	products    : Product[] = [];
	totalPages  : number  = 0;
	searchTerm  : string = "";
	selectedPage: number = 0;
	minPrice: number = 0;
	maxPrice: number = 1000;

	constructor(
		public searchService: SearchService
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

	addProduct(product: Product){
		let duplicate = false;								
		if (localStorage.getItem("cart") != null) {
			let products = JSON.parse(localStorage.getItem("cart") || "")
			for (let i = 0; i < products.length; i++) {
				let element = products[i];
				if (element.product._id == product._id) {
					let quantity_product = {
						product: product,
						quantity: element.quantity + 1
					}
					duplicate = true;
					products[i] = quantity_product;
				}
			}
			if (!duplicate) {
				let quantity_product = {
					product: product,
					quantity: 1
				}
				products.push(quantity_product);
			}
			localStorage.setItem('cart', JSON.stringify(products));
		} else {
			let quantity_product = {
				product: product,
				quantity: 1
			}
			let products = [quantity_product];
			localStorage.setItem('cart', JSON.stringify(products));
		}
	}

}
