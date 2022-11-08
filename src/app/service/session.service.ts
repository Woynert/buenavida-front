import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

	// /session/signin

	signIn(form: SignInI): Observable<MessageI> {
		let options = { withCredentials: true };
		const body=JSON.stringify(form);
		return this.http.post<MessageI>(`${environment.HOSTAPI}/session/signin`, body, options)
	}

	// /session/login

	logIn(form: LogInI): Observable<MessageI> {
		let options = { withCredentials: true };
		const body=JSON.stringify(form);
		return this.http.post<MessageI>(`${environment.HOSTAPI}/session/login`, body, options)
	}

	// /session/refresh
	
	async checkSession(): Promise<boolean> {

		let options = {
			observe: "response" as 'body',
			withCredentials: true
		};

		// check access token is valid
		try{
			console.log("Checking Access token ...");
			await this.http.get(`${environment.HOSTAPI}/session/ping`, options).toPromise();
			console.log("Access token valid");
			return true;
		}
		catch(e){
			console.log("Access token invalid");
		}

		// try refresh token
		try{
			console.log("Trying to refresh ...");
			await this.http.get(`${environment.HOSTAPI}/session/refresh`, options).toPromise();
			console.log("Successfully refreshed");
			return true;
		}
		catch(e){
			console.log("Refresh token invalid");
		}

		// give up
		return false;

	}
}
