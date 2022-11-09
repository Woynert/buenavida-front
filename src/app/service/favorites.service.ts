import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

import { TokenService } from '@service/token.service';
import { MessageI } from '@shared/message';
import { iUserInfo, Product } from '@shared/interface';

@Injectable({
	providedIn: 'root'
})
export class FavoritesService {

	subjectUser: Subject<iUserInfo> = new Subject<iUserInfo>();
	currentUser?: iUserInfo;

	subjectViewingFavorites: Subject<boolean> = new Subject<boolean>();
	viewingFavorites: boolean = false;

	constructor(
		private toastr: ToastrService,
		private http: HttpClient,
		private tokenService: TokenService
	) { }

	// /favorite add 
	async addToFavorites(itemid: string) {

		// check token 
		if (!await this.tokenService.checkSession()){
			this.toastr.warning("Log in first", "");
			return;
		}

		// action
		try{
			let options = { withCredentials: true };
			let asd = await this.http.put<MessageI>(
				`${environment.HOSTAPI}/favorite?itemid=${itemid}`, {}, options).toPromise();
			this.toastr.success('Item added to favorites', '');
		}
		catch(e){
			console.log("Couldn't add item to favorites");
		}
	}

	// /favorite remove 
	async removeFromFavorites(itemid: string) {

		// check token 
		if (!await this.tokenService.checkSession())
			return;

		// action
		try{
			let options = { withCredentials: true };
			let asd = await this.http.delete<MessageI>(
				`${environment.HOSTAPI}/favorite?itemid=${itemid}`, options).toPromise();
			this.toastr.success('Item removed from favorites', '');
		}
		catch(e){
			console.log("Couldn't remove item from favorites");
		}
	}

	// /user/info
	async fetchUserInfo() {

		// check token
		if (!await this.tokenService.checkSession())
			return;

		try{
			let options = { withCredentials: true };
			let user = await this.http.get<iUserInfo>(
				`${environment.HOSTAPI}/user/info`, options).toPromise();

			if (user){
				this.currentUser = user;
				this.subjectUser.next(this.currentUser);
			}
		}
		catch(e){
			console.log("Coulnd't fetch user info");
		}
	}

	// vieweing favorites

	toggleViewingFavorites() {
		this.viewingFavorites = !this.viewingFavorites;
		this.subjectViewingFavorites.next(this.viewingFavorites);
		console.log(this.viewingFavorites);
	}

	getFavorites(pageId: number): Product[] {
		if (this.currentUser){
			console.log(this.currentUser.favorites);
			return (this.currentUser.favorites.slice(pageId*12, (pageId+1)*12));
		}
		return [];
	}

	getFavoritesTotal(): number {
		if (this.currentUser){
			console.log(this.currentUser.favorites.length);
			return (Math.ceil(this.currentUser.favorites.length / 12));
		}
		return 0;
	}
}
