import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@shared/interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
	  private http: HttpClient
  ) { }

  makeSearch(): Observable<Product[]> {
	  return this.http.get<Product[]>("http://127.0.0.1:8070/store")
  }
}
