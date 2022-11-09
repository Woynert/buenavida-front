import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment';

@Injectable({
	providedIn: 'root'
})

export class TokenService {

	activeSession: boolean = false;

	constructor(
		private http: HttpClient,
	) { }

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
			this.activeSession = true;
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
			this.activeSession = true;
			return true;
		}
		catch(e){
			console.log("Refresh token invalid");
		}

		// give up
		this.activeSession = false;
		return false;
	}

}
