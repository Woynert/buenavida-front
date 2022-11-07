import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-vitrina-filter',
	templateUrl: './vitrina-filter.component.html',
	styleUrls: ['./vitrina-filter.component.css']
})
export class VitrinaFilterComponent implements OnInit {

	minPrice  : number = 0;
	maxPrice  : number = 100;
	leftPrice : number = 0;
	rightPrice: number = 100;

	@ViewChild('rangeLeft') rangeLeft!: ElementRef<HTMLInputElement>;
	@ViewChild('rangeRight') rangeRight!: ElementRef<HTMLInputElement>;
	@ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

	constructor(
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
	}

	updateDoubleRange() {
		let leftPrice = parseInt(this.rangeLeft.nativeElement.value);
		let rightPrice = parseInt(this.rangeRight.nativeElement.value);

		if (leftPrice > rightPrice){
			leftPrice = rightPrice;
			this.rangeLeft.nativeElement.value = rightPrice + "";
		}

		if (rightPrice < leftPrice){
			rightPrice = leftPrice;
			this.rangeRight.nativeElement.value = leftPrice + "";
		}

		// move progress bar
		let leftMargin = (leftPrice * 100) / this.maxPrice;
		this.progressBar.nativeElement.style.left = leftMargin + "%";
		let rightMargin = 100 - (rightPrice * 100) / this.maxPrice;
		this.progressBar.nativeElement.style.right = rightMargin + "%";

		this.leftPrice = leftPrice;
		this.rightPrice = rightPrice;
	}

	submitPriceFilter(){
	}
}
