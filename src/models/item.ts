import { v4 } from 'uuid';
import Category from '../shared/category';
import Size from '../shared/size';
import database from '../database/database';

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

	async save(): Promise<boolean> {
		const text = `
			insert into item(id, name, category, size, price, spicy, description)
			values($1, $2, $3, $4, $5, $6, $7);
		`;
		const values = [
			this.id,
			this.name,
			this.category,
			this.size,
			this.price,
			this.spicy,
			this.description,
		];

		const savePromise: Promise<any> = new Promise(async (resolve, _) => {
			setTimeout(() => {
				resolve(false);
			}, 5000);

			await database.query(text, values);

			resolve(true);
		});

		return savePromise;
	}
}
