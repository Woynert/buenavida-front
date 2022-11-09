import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment';

import { FavoritesService } from '@service/favorites.service';
import { TokenService } from '@service/token.service';
import { iUserInfo } from '@shared/interface';
import { SignInI } from '@shared/signinI';
import { LogInI } from '@shared/logInI';
import { MessageI } from '@shared/message';

@Injectable({
	providedIn: 'root'
})

export class SessionService {

	constructor(
		private http: HttpClient,
		private favoritesService: FavoritesService,
		private tokenService: TokenService
	) { }

	// /session/signin

	signIn(form: SignInI): Observable<MessageI> {
		let options = { withCredentials: true };
		const body=JSON.stringify(form);
		return this.http.post<MessageI>(`${environment.HOSTAPI}/session/signin`, body, options)
	}

	// /session/login
	
	async logIn(form: LogInI): Promise<string> {

		try{
			const options = { withCredentials: true };
			const body = JSON.stringify(form);
			const msg = await this.http.post<MessageI>(`${environment.HOSTAPI}/session/login`, body, options).toPromise();
			await this.favoritesService.fetchUserInfo();
			return msg!.message;
		}
		catch(e){
			if (e instanceof HttpErrorResponse){
				if (e.error) throw new Error(e.error.message);
			}

			throw new Error("Unknow error");
		}

	}

}
