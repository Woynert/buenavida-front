import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment';

import { Product } from '@shared/interface';

@Injectable({
	providedIn: 'root'
})

export class SearchService {

	constructor(
		private http: HttpClient
	) { }

	makeSearch(): Observable<SearchResponse> {

		//let res = this.http.get<SearchResponse[]>(`${environment.HOSTAPI}/store`)
		//return res.products
		return this.http.get<SearchResponse>(`${environment.HOSTAPI}/store`)
	}
}

export interface SearchResponse {
	totalcount: number;
	products:   Product[];
}
