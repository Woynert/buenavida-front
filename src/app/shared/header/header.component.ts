import { Component, OnInit, ViewChild, ElementRef,HostListener } from '@angular/core';
import { SearchService, SearchResponse } from '@service/search.service';

import { Product } from '@shared/interface';

import { ProductsCart } from '@shared/ProductsCart';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {

	@ViewChild("searchBarInput") searchBarInput!: ElementRef<HTMLInputElement>;
	public styleDisplay:string = "display:none";

	/*Modal Cart Variables*/
	public styleDisplayModalCart:string = "display:none";
	public total_productos:number = 0;
	public productsCart: ProductsCart[] = [];
	public subtotal:number = 0;
	public iva_include:number = 0;
	public numbetChange:number = 0;

	constructor(
		public searchService: SearchService
	) {}

	ngOnInit(): void {
	}

	focusSearchBar(): void {
		this.searchBarInput.nativeElement.focus();
	}

	setSearchTerm(): void {
		this.searchService.setSearchTerm(this.searchBarInput.nativeElement.value);	
	}

	/* Menu Funtion*/
	showMyMenu(): void {
		this.styleDisplay = "display:block";
	}

	hideMyMenu(): void {
		this.styleDisplay = "display:none";
	}

	/* Modal Cart Funtion */
	openModalCart(): void {
		this.styleDisplayModalCart = "display:block";
		this.calculateCart();
	}

	calculateCart(): void {
		if (localStorage.getItem("cart") != null) {
			let products = JSON.parse(localStorage.getItem("cart") || "")
			let total = 0;
			let subtotal = 0;
			this.productsCart = products;
			for (let i = 0; i < products.length; i++) {
				let element = products[i];
				total += element.quantity;
				subtotal += element.quantity * element.product.price;
			}
			this.total_productos = total;
			this.subtotal = subtotal;
			this.iva_include = (subtotal*0.19)+(subtotal);
		}
	}

	quantityChange(quantity:number,product: Product): void {  
		if (localStorage.getItem("cart") != null) {
			let products = JSON.parse(localStorage.getItem("cart") || "")
			for (let i = 0; i < products.length; i++) {
				let element = products[i];
				if (element.product._id == product._id) {
					let quantity_product = {
						product: product,
						quantity: quantity
					}
					products[i] = quantity_product;
				}
			}
			localStorage.setItem('cart', JSON.stringify(products));
		}
		this.calculateCart();
	}

	removeItemCart(product: Product): void {
		let index = -1;
		if (localStorage.getItem("cart") != null) {
			let products = JSON.parse(localStorage.getItem("cart") || "")
			for (let i = 0; i < products.length; i++) {
				let element = products[i];
				if (element.product._id == product._id) {
					index = i;
				}
			}
			if (index != -1) {
				products.splice(index, 1);
				localStorage.setItem('cart', JSON.stringify(products));
			}
		}
		this.calculateCart();
	}

	closeModalCart(): void {
		this.styleDisplayModalCart = "display:none";
	}
}
