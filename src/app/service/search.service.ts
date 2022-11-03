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

  makeSearch(): Observable<Product[]> {
	  return this.http.get<Product[]>(`${environment.HOSTAPI}/store`)
  }
}
