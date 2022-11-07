
export interface Product {
	_id:          string;
	title:        string;
	units:        string;
	price:        number;
	discount:     number;
	priceperunit: string;
	description:  string;
	imageurl:     string;
	score:        number;
}

// Vitrina apply price filter on product search
export interface iEventApplyPriceFilter {
	minPrice: number;
	maxPrice: number;
}
