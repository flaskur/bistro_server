import { v4 } from 'uuid';

enum Size {
	SMALL = 'SM',
	LARGE = 'LG',
	LUNCH = 'LCH',
	DINNER = 'DNR',
}

enum Category {
	SOUP = 'SOUP',
	APPETIZER = 'APPETIZER',
	SALAD = 'SALAD',
	VEGETABLE = 'VEGETABLE',
	CHINESE = 'CHINESE',
	JAPANESE = 'JAPANESE',
	THAI = 'THAI',
	CURRY = 'CURRY',
	RICE = 'RICE',
	NOODLE = 'NOODLE',
	HIBACHI = 'HIBACHI',
	TRAY = 'TRAY',
	COMBO = 'COMBO',
}

export default class Item {
	private _id: string;
	private _name: string;
	private _category: Category;
	private _size: Size;
	private _price: number;
	private _spicy: boolean;
	private _description: string;

	constructor(name: string, category: Category, size: Size, price: number, spicy: boolean, description: string = '') {
		this._id = v4().replace(/-/g, '');
		this._name = name;
		this._category = category;
		this._size = size;
		this._price = price;
		this._spicy = spicy;
		this._description = description;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get category(): Category {
		return this._category;
	}

	get size(): Size {
		return this._size;
	}

	get price(): number {
		return this._price;
	}

	get spicy(): boolean {
		return this._spicy;
	}

	get description(): string {
		return this._description;
	}
}
