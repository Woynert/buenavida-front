import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product, iEventApplyPriceFilter } from '@shared/interface';
import { SearchService, SearchResponse } from '@service/search.service';
import { FavoritesService } from '@service/favorites.service';
import { CartService } from '@service/cart.service';

import { iUserInfo } from '@shared/interface';
import { ProductsCart } from '@shared/ProductsCart';

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
	userInfoSubscription: Subscription = Subscription.EMPTY;
	cartSubscription: Subscription = Subscription.EMPTY;
	viewingFavoritesSubscription: Subscription = Subscription.EMPTY;

	selectedProduct: Product | null = null;
	products       : Product[] = [];

	searchTerm: string = "";
	minPrice  : number = 0;
	maxPrice  : number = 1000;

	totalPages      : number  = 0;
	selectedPage    : number  = 0;

	constructor(
		public searchService: SearchService,
		public favoritesService: FavoritesService,
		public cartService: CartService,
	) { }

	ngOnInit(): void {
		// get products
		this.getProductsFromSearch();

		// get search term from topbar
		this.searchTermSubscription = this.searchService.searchTerm.subscribe(
			(term: string) => {
				this.searchTerm = term;
				this.selectedPage = 0;
				this.getProductsFromSearch();
			});

		// user info was updated
		this.userInfoSubscription = this.favoritesService.subjectUser.subscribe(
			(info: iUserInfo) => {
				this.matchFavorites();
			});

		// get user info if there is a session
		this.favoritesService.fetchUserInfo();

		// get cart changes
		this.cartSubscription = this.cartService.updateCart().subscribe(
			(message) => {
				this.cartService.calculateCart();
				if (this.selectedProduct) this.selectProduct(this.selectedProduct);
				console.log("CAMBIO");
				console.log(this.selectedProduct);
			});

		// viewing favorite changes
		this.viewingFavoritesSubscription = this.favoritesService.subjectViewingFavorites.subscribe(
			(vf: boolean) => {
				this.eventSelectPage(0);
			});
	}

	// make search

	getProductsFromSearch(): void {
		if (this.favoritesService.viewingFavorites){
			this.products = this.favoritesService.getFavorites(this.selectedPage);
			this.totalPages = this.favoritesService.getFavoritesTotal();
			this.matchFavorites();
			return;
		}

		this.searchService.makeSearch(this.searchTerm, this.minPrice, this.maxPrice, this.selectedPage)
		.subscribe((res: SearchResponse) => {
			this.products      = res.products;
			this.totalPages    = Math.ceil(res.totalcount / 12); // 12 items per page
			this.matchFavorites();
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

		if (!product)
			return;

		this.selectedProduct = product;

		// set quantity
		//
		let productQuantity: number = 0;
		const onCart: boolean = this.cartService.productsCart.some(
			(pc: ProductsCart) => {
				productQuantity = pc.quantity;
				//console.log(pc);
				return (pc.product._id == this.selectedProduct!._id)
			});

		console.log(productQuantity);

		this.selectedProduct.onCart = onCart;

		if (onCart && productQuantity){
			this.selectedProduct.quantity = productQuantity;
		}
		else if (!this.selectedProduct.quantity){
			this.selectedProduct.quantity = 1;
		}

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
