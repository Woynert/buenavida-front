import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { HttpClient } from '@angular/common/http';

import { ProductsCart } from '@shared/ProductsCart';
import { Product } from '@shared/interface';
import { MessageI } from '@shared/message';
import { ToastrService } from 'ngx-toastr';

import { TokenService } from '@service/token.service';

@Injectable({
	providedIn: 'root'
})
export class CartService {

	public total_productos:number = 0;
	public productsCart: ProductsCart[] = [];
	public subtotal:number = 0;
	public iva_include:number = 0;
	public numbetChange:number = 0;

	constructor(
		private tokenService: TokenService,
		private http: HttpClient,
		private toastr: ToastrService
	) { }

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

	async payment() {
		if (!await this.tokenService.checkSession()){
			this.toastr.error("Porfavo Iniciar Sección", '');
			return;
		}

		// action
		try{
			let options = { withCredentials: true };
			if (localStorage.getItem("cart") != null) {
				let products = JSON.parse(localStorage.getItem("cart") || "")
				if (products.length>0){
					let products_payment = []
					for (let i = 0; i < products.length; i++) {
						let element = products[i];
						let add_payment ={
							"itemid": element.product._id,
							"quantity": element.quantity
						}
						products_payment.push(add_payment);
					}
					let asd = await this.http.post<MessageI>(
					`${environment.HOSTAPI}/payment`,products_payment, options).toPromise();
					this.toastr.success('Item removed from favorites', '');
				}
			}
			
		}
		catch(e){
			this.toastr.error("Couldn't remove item from favorites", '');
		}
	}
	
}
