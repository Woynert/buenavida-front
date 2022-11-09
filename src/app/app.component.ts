import { Component, OnInit } from '@angular/core';
import { TokenService } from '@service/token.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	title = 'Buenavida';

	constructor(
		private tokenService: TokenService
	) { }

	ngOnInit(){
		console.log("START")
		this.tokenService.checkSession();
	}
}
