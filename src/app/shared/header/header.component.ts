import { Component, OnInit, ViewChild, ElementRef,HostListener } from '@angular/core';
import { SearchService, SearchResponse } from '@service/search.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@ViewChild("searchBarInput") searchBarInput!: ElementRef<HTMLInputElement>;
	public styleDisplay = "display:none";

	constructor(
		public searchService: SearchService
	) {}

	ngOnInit(): void {
	}

	focusSearchBar(): void {
		this.searchBarInput.nativeElement.focus();
	}

	setSearchTerm(): void {
		this.searchService.setSearchTerm(this.searchBarInput.nativeElement.value);	
	}

	showMyMenu(): void {
		this.styleDisplay = "display:block";
	}

	hideMyMenu(): void {
		this.styleDisplay = "display:none";
	}
}
