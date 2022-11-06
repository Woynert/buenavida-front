import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment';

import { SignInI } from '@shared/signinI';

interface Message {
    message: string;
}


@Injectable({
	providedIn: 'root'
})
export class SessionService {

	postId:any = "";

	constructor(
		private http: HttpClient
	) { }

	// endpoints
	// /session/login
	// /session/signin
	

	signIn(form: SignInI): Observable<any> {
		const body=JSON.stringify(form);
		return this.http.post<any>(`${environment.HOSTAPI}/session/signin`, body)
	}

	// /session/refresh
	//
	// other
	// checksession
	//
}
