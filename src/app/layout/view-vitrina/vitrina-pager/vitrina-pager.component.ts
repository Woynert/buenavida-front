import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-vitrina-pager',
	templateUrl: './vitrina-pager.component.html',
	styleUrls: ['./vitrina-pager.component.css']
})
export class VitrinaPagerComponent implements OnInit, OnChanges {

	@Input() totalPages: number = 0;
	@Input() currentPage: number = 0;
	pagesOffset: number = 0;
	pagesArray: Array<number> = [];
	maxBtns: number = 5;

	constructor(
	) { }

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log("Me")
		this.updateOffset()
	}

	updateOffset() {
		this.pagesArray = [];
		for (let i = this.pagesOffset; i < this.pagesOffset + this.maxBtns; i++){
			this.pagesArray.push(i);
		}
	}

	goLeft() {
		this.pagesOffset = Math.max(0, this.pagesOffset-1);
		this.updateOffset()
		console.log(this.pagesOffset)
	}

	goRight() {
		this.pagesOffset = Math.min(this.totalPages -this.maxBtns, this.pagesOffset+1);
		this.updateOffset()
		console.log(this.pagesOffset)
	}

}
