import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService, SearchResponse } from '@service/search.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@ViewChild("searchBarInput") searchBarInput!: ElementRef<HTMLInputElement>;

	constructor(
		public searchService: SearchService
	) { }

	ngOnInit(): void {
	}

	focusSearchBar(): void {
		this.searchBarInput.nativeElement.focus();
	}

	setSearchTerm(): void {
		console.log(this.searchBarInput.nativeElement.value);
		this.searchService.setSearchTerm(this.searchBarInput.nativeElement.value);	
	}

}
