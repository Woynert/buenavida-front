import { Injectable } from '@angular/core';

import { ProductsCart } from '@shared/ProductsCart';
import { Product } from '@shared/interface';

@Injectable({
	providedIn: 'root'
})
export class CartService {

	public total_productos:number = 0;
	public productsCart: ProductsCart[] = [];
	public subtotal:number = 0;
	public iva_include:number = 0;
	public numbetChange:number = 0;

	constructor() { }

	addProduct(product: Product,quantity: number){
		let duplicate = false;								
		if (localStorage.getItem("cart") != null) {
			let products = JSON.parse(localStorage.getItem("cart") || "")
			for (let i = 0; i < products.length; i++) {
				let element = products[i];
				if (element.product._id == product._id) {
					let quantity_product = {
						product: product,
						quantity: element.quantity + quantity
					}
					duplicate = true;
					products[i] = quantity_product;
				}
			}
			if (!duplicate) {
				let quantity_product = {
					product: product,
					quantity: quantity
				}
				products.push(quantity_product);
			}
			localStorage.setItem('cart', JSON.stringify(products));
		} else {
			let quantity_product = {
				product: product,
				quantity: quantity
			}
			let products = [quantity_product];
			localStorage.setItem('cart', JSON.stringify(products));
		}
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

	clearCart(): void {
		localStorage.setItem('cart', JSON.stringify([]));
	}
	
}
