class Customer {
	private _email = '';
	private _firstName = '';
	private _lastName = '';
	private _phoneNumber = '';
	private _address = '';
	private _verified = false;

	constructor(email: string) {
		this._email = email;
	}

	get email(): string {
		return this._email;
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
}
