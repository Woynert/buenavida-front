import { Component, OnInit, ViewChild, ElementRef,HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService, SearchResponse } from '@service/search.service';
import { CartService } from '@service/cart.service';
import { SessionService } from '@service/session.service';
import { TokenService } from '@service/token.service';

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
		public searchService: SearchService,
		public cartService: CartService,
		public sessionService: SessionService,
		public tokenService: TokenService,
		private router: Router
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
		this.cartService.calculateCart();
		this.productsCart = this.cartService.productsCart;
		this.total_productos = this.cartService.total_productos;
		this.subtotal = this.cartService.subtotal;
		this.iva_include = this.cartService.iva_include;
	}

	quantityChange(quantity:number,product: Product): void {  
		this.cartService.quantityChange(quantity,product);
		this.calculateCart();
	}

	removeItemCart(product: Product): void {
		this.cartService.removeItemCart(product);
		this.calculateCart();
	}

	closeModalCart(): void {
		this.styleDisplayModalCart = "display:none";
	}

	goCart(){
		this.closeModalCart();
		this.router.navigate(['/cart']);
	}

	payment(): void {
		this.cartService.payment();
	}
}
