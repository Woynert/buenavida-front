import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment';

import { Product } from '@shared/interface';

@Injectable({
	providedIn: 'root'
})

export class SearchService {

	//products: Product[] = [];

	////totalProducts: number = 0;
	//initialPage  : number = 0;
	//totalPages   : number = 0;

	constructor(
		private http: HttpClient
	) { }

	//reset(): void {
		//this.products = [];

		////this.totalProducts = 0;
		//this.initialPage   = 0;
		//this.totalPages    = 0;
	//}

	makeSearch(): Observable<SearchResponse> {
	//makeSearch(): void {

		//let res = this.http.get<SearchResponse[]>(`${environment.HOSTAPI}/store`)
		//return res.products
		//this.http.get<SearchResponse>(`${environment.HOSTAPI}/store`)
			//.subscribe((res: SearchResponse) => {
			//this.products      = res.products;
			////this.totalProducts = res.totalcount;
			//this.totalPages    = Math.ceil(res.totalcount / 24);
		//});

		//console.log(this.products)
		return this.http.get<SearchResponse>(`${environment.HOSTAPI}/store`)
	}
}

export interface SearchResponse {
	totalcount: number;
	products:   Product[];
}
