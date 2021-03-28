import { v4 } from 'uuid';
import database from '../database/database';
import PurchaseType from '../shared/purchase-type';

const PA_TAX_RATE = 1.06;

export default class Purchase {
	private _purchaseId: string;
	private _customerId: string;
	private _purchaseType: PurchaseType;
	private _subtotal: number;
	private _total: number;
	private _purchaseDate: Date;
	private _purchaseTime: string;
	private _comment: string;

	constructor(customerId: string, purchaseType: PurchaseType, subtotal: number, comment: string = '') {
		this._purchaseId = v4().replace(/-/g, '');
		this._customerId = customerId;
		this._purchaseType = purchaseType;
		this._subtotal = subtotal;
		this._total = parseFloat((subtotal * PA_TAX_RATE).toFixed(2));
		this._purchaseDate = new Date();
		this._purchaseTime = `${this.purchaseDate.getHours()}:${this.purchaseDate.getMinutes()}:${this.purchaseDate.getSeconds()}`;
		this._comment = comment;
	}

	get purchaseId() {
		return this._purchaseId;
	}
	get customerId() {
		return this._customerId;
	}
	get purchaseType() {
		return this._purchaseType;
	}
	get subtotal() {
		return this._subtotal;
	}
	get total() {
		return this._total;
	}
	get purchaseDate() {
		return this._purchaseDate;
	}
	get purchaseTime() {
		return this._purchaseTime;
	}
	get comment() {
		return this._comment;
	}

	async save(): Promise<boolean> {
		const text = `
			insert into purchase(purchase_id, customer_id, purchase_type, subtotal, total, purchase_date, purchase_time, comment)
			values($1, $2, $3, $4, $5, $6, $7, $8);
		`;
		const values = [
			this.purchaseId,
			this.customerId,
			this.purchaseType,
			this.subtotal,
			this.total,
			this.purchaseDate,
			this.purchaseTime,
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
