import { Component, OnInit, ViewChild, ElementRef,HostListener } from '@angular/core';
import { SearchService, SearchResponse } from '@service/search.service';

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

	showMyMenu(): void {
		this.styleDisplay = "display:block";
	}

	hideMyMenu(): void {
		this.styleDisplay = "display:none";
	}

	openModalCart(): void {
		this.styleDisplayModalCart = "display:block";
		if (localStorage.getItem("cart") != null) {
			let products = JSON.parse(localStorage.getItem("cart") || "")
			let total = 0;
			this.productsCart = products;
			for (let i = 0; i < products.length; i++) {
				let element = products[i];
				total += element.quantity;
			}
			this.total_productos = total;
		}
	}

	closeModalCart(): void {
		this.styleDisplayModalCart = "display:none";
	}
}
