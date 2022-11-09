import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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
	private subject = new Subject<any>();

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
			this.subject.next('change');
		} else {
			let quantity_product = {
				product: product,
				quantity: quantity
			}
			let products = [quantity_product];
			localStorage.setItem('cart', JSON.stringify(products));
			this.subject.next('change');
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
			this.subject.next('change');
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
				this.subject.next('change');
			}
		}
		this.calculateCart();
	}

	clearCart(): void {
		localStorage.setItem('cart', JSON.stringify([]));
		this.subject.next('change');
		this.calculateCart();
	}

	async payment() {
		if (!await this.tokenService.checkSession()){
			this.toastr.warning("Primero Inicie Sección", '');
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
					let message = await this.http.post<MessageI>(
					`${environment.HOSTAPI}/payment`,products_payment, options).toPromise();
					this.toastr.success('Pedido Realizado', '');
					this.clearCart();
				} else {
					this.toastr.warning("El carrito esta vacio", '');
				}
			}
			
		}
		catch(e){
			this.toastr.warning("No se pudo realizar el pedido", '');
		}
	}

	updateCart(): Observable<string> {
        return this.subject.asObservable();
    }
	
}
