import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '@environment';

import { Product } from '@shared/interface';

@Injectable({
	providedIn: 'root'
})

export class SearchService {

	searchTerm: Subject<string> = new Subject<string>();

	constructor(
		private http: HttpClient
	) { }

	makeSearch(searchTerm: string, minPrice: number, maxPrice: number, pageId: number): Observable<SearchResponse> {
		return this.http.get<SearchResponse>(
		`${environment.HOSTAPI}/store?searchterm=${searchTerm}&minprice=${minPrice}&maxprice=${maxPrice}&pageid=${pageId}`)
	}

	setSearchTerm(term: string){
		this.searchTerm.next(term);
	}
}

export interface SearchResponse {
	totalcount: number;
	products:   Product[];
}
