import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import database from '../database/database';
import { v4 } from 'uuid';

export default class Customer {
	private _id = '';
	private _email = '';
	private _password = ''; // hashed password
	private _firstName = '';
	private _lastName = '';
	private _phoneNumber = '';
	private _address = '';
	private _verified = false;
	private _hash: string; // random string for email verification

	constructor(email: string, password: string) {
		this._id = v4().replace(/-/g, '');

		this._email = email;

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		this._password = hashedPassword;

		this._hash = crypto.randomBytes(20).toString('hex'); // hex to avoid special chars
		console.log(`the hash is ${this.hash}, id is ${this.id}`);
	}

	get id(): string {
		return this._id;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	get firstName(): string {
		return this._firstName;
	}
	set firstName(newFirstName: string) {
		this._firstName = newFirstName;
	}

	get lastName(): string {
		return this._lastName;
	}
	set lastName(newLastName: string) {
		this._lastName = newLastName;
	}

	get phoneNumber(): string {
		return this._phoneNumber;
	}
	set phoneNumber(newPhoneNumber: string) {
		this._phoneNumber = newPhoneNumber;
	}

	get address(): string {
		return this._address;
	}
	set address(newAddress: string) {
		this._address = newAddress;
	}

	get verified(): boolean {
		return this._verified;
	}
	set verified(status: boolean) {
		this._verified = status;
	}

	get hash(): string {
		return this._hash;
	}

	// create save method to add customer entry to database
	async save(): Promise<boolean> {
		// should be insert, on conflict update

		console.log('attempting to save');

		const text = `
			insert into customer(id, email, password, first_name, last_name, phone_number, address, verified, hash)
			values($1, $2, $3, $4, $5, $6, $7, $8, $9)
			on conflict (id, email) do update set
			password = $3,
			first_name = $4,
			last_name = $5,
			phone_number = $6,
			address = $7,
			verified = $8,
			hash = $9;
		`;
		const values = [
			this.id,
			this.email,
			this.password,
			this.firstName,
			this.lastName,
			this.phoneNumber,
			this.address,
			this.verified,
			this.hash,
		];

		const savePromise: Promise<any> = new Promise(async (resolve, _) => {
			// will resolve false if db query doesn't complete in 5 seconds
			setTimeout(() => {
				resolve(false);
			}, 5000);

			await database.query(text, values);

			resolve(true);
		});

		return savePromise;
	}
}
