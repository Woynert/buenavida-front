import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '@service/cart.service';

import { Product } from '@shared/interface';
import { ProductsCart } from '@shared/ProductsCart';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  	public total_productos:number = 0;
	public productsCart: ProductsCart[] = [];
	public subtotal:number = 0;
	public iva_include:number = 0;
	public numbetChange:number = 0;
	public subscription: Subscription;

	constructor(
		public cartService: CartService
	) {
		this.subscription = this.cartService.updateCart().subscribe(message => {
			this.calculateCart();
		});
	 }

	ngOnInit(): void {
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
	}

	removeItemCart(product: Product): void {
		this.cartService.removeItemCart(product);
	}

	async payment() {
		await this.cartService.payment();
	}
}
