import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { iEventApplyPriceFilter } from '@shared/interface';

@Component({
	selector: 'app-vitrina-filter',
	templateUrl: './vitrina-filter.component.html',
	styleUrls: ['./vitrina-filter.component.css']
})
export class VitrinaFilterComponent implements OnInit, AfterViewInit {

	minPrice  : number = 0;
	maxPrice  : number = 100;
	leftPrice : number = 0;
	rightPrice: number = 100;

	@Output() eventApplyPriceFilter = new EventEmitter<iEventApplyPriceFilter>();

	@ViewChild('rangeLeft') rangeLeft!: ElementRef<HTMLInputElement>;
	@ViewChild('rangeRight') rangeRight!: ElementRef<HTMLInputElement>;
	@ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

	constructor(
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
	}

	ngAfterViewInit() {
		console.log("U")
		this.updateDoubleRange();
	}

	updateDoubleRange() {
		let leftPrice  = parseInt(this.rangeLeft.nativeElement.value);
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
		let rightMargin = 100 - (rightPrice * 100) / this.maxPrice;

		this.progressBar.nativeElement.style.left = leftMargin + "%";
		this.progressBar.nativeElement.style.right = rightMargin + "%";

		this.leftPrice = leftPrice;
		this.rightPrice = rightPrice;
	}

	applyPriceFilter(){
		const filter: iEventApplyPriceFilter = {
			minPrice: this.leftPrice,
			maxPrice: this.rightPrice
		};

		this.eventApplyPriceFilter.emit(filter);
	}
}

