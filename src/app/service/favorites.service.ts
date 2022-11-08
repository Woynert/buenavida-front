import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { ToastrService } from 'ngx-toastr';

import { SessionService } from '@service/session.service';
import { MessageI } from '@shared/message';

@Injectable({
	providedIn: 'root'
})
export class FavoritesService {

	constructor(
		private toastr: ToastrService,
		private http: HttpClient,
		public sessionService: SessionService
	) { }

	async addToFavorites(itemid: string) {

		// check token 
		if (!await this.sessionService.checkSession())
			return;

		console.log("u");

		// action
		try{
			let options = { withCredentials: true };
			let asd =await this.http.put<MessageI>(`${environment.HOSTAPI}/favorite?itemid=${itemid}`, {}, options).toPromise();
			//console.log(asd, "Item added to favorites");
			this.toastr.success('Item added to favorites', 'asd');
		}
		catch(e){
			console.log("Couldn't add item to favorites");
		}
	}

	// endPoints
	// /favorite add 
	// /favorite remove 
	//
	// dataAccess
	// get favorites
}
