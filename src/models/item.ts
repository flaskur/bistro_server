import { v4 } from 'uuid';
import database from '../database/database';

export default class Item {
	private _itemId: string;
	private _foodId: string;
	private _purchaseId: string;
	private _quantity: number;
	private _comment: string;

	// POST PURCHASE WILL CREATE PURCHASE FIRST, THEN ITEM ENTRIES
	constructor(foodId: string, purchaseId: string, quantity: number, comment = '') {
		this._itemId = v4().replace(/-/g, '');
		this._foodId = foodId;
		this._purchaseId = purchaseId;
		this._quantity = quantity;
		this._comment = comment;
	}

	get itemId() {
		return this._itemId;
	}
	get foodId() {
		return this._foodId;
	}
	get purchaseId() {
		return this._purchaseId;
	}
	get quantity() {
		return this._quantity;
	}
	get comment() {
		return this._comment;
	}

	async save(): Promise<boolean> {
		const text = `
			insert into item(item_id, food_id, purchase_id, quantity, comment)
			values($1, $2, $3, $4, $5);
		`;
		const values = [
			this.itemId,
			this.foodId,
			this.purchaseId,
			this.quantity,
			this.comment,
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
