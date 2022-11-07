import {
	Component,
	OnInit,
	Input,
	OnChanges,
	SimpleChanges,
	Output,
	EventEmitter,
	ChangeDetectionStrategy
} from '@angular/core';

@Component({
	selector: 'app-vitrina-pager',
	templateUrl: './vitrina-pager.component.html',
	styleUrls: ['./vitrina-pager.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VitrinaPagerComponent implements OnInit, OnChanges {

	@Output() eventPageSelected = new EventEmitter<number>();
	@Input()  totalPages: number = 0;
	@Input()  currentPage: number = 0;

	pagesOffset: number = 0;
	pagesArray: Array<number> = [];
	maxBtns: number = 5;

	constructor(
	) { }

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log("Me",changes, this.totalPages);
		//this.totalPages  = changes
		//this.currentPage = 0;
		this.pagesOffset = 0;
		this.updateOffset()
	}

	selectPage(pageId: number) {
		this.currentPage = pageId;
		this.eventPageSelected.emit(pageId);
	}

	updateOffset() {
		this.pagesArray = [];
		for (let i = this.pagesOffset; i < Math.min(this.totalPages, this.pagesOffset + this.maxBtns); i++){
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
