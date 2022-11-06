import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment';

import { SignInI } from '@shared/signinI';
import { LogInI } from '@shared/logInI';
import { MessageI } from '@shared/message';

@Injectable({
	providedIn: 'root'
})

export class SessionService {

	constructor(
		private http: HttpClient
	) { }

	// endpoints
	// /session/login
	// /session/signin
	

	signIn(form: SignInI): Observable<MessageI> {
		const body=JSON.stringify(form);
		return this.http.post<MessageI>(`${environment.HOSTAPI}/session/signin`, body)
	}

	logIn(form: LogInI): Observable<MessageI> {
		const body=JSON.stringify(form);
		return this.http.post<MessageI>(`${environment.HOSTAPI}/session/login`, body)
	}

	// /session/refresh
	//
	// other
	// checksession
	//
}
