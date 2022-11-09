import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment';

@Injectable({
	providedIn: 'root'
})

export class TokenService {

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
