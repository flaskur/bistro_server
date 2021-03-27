import Customer from '../models/customer';
import bcrypt from 'bcryptjs';

describe('customer model', () => {
	let customer: Customer;

	beforeEach(() => {
		customer = new Customer('bob@bob.mail', 'secret');
	});

	test('should have customer id of 32 characters', () => {
		expect(customer.customerId).toHaveLength(32);
	});

	test('should have correct email', () => {
		expect(customer.email).toEqual('bob@bob.mail');
	});

	test('should have hashed password that maps to secret', () => {
		let isCorrectPassword = bcrypt.compareSync('secret', customer.password);
		expect(isCorrectPassword).toBe(true);
	});

	test('should have hashed password that fails on incorrect password', () => {
		let isCorrectPassword = bcrypt.compareSync('notsecret', customer.password);
		expect(isCorrectPassword).toBe(false);
	});

	test('should have a hash of 40 characters', () => {
		expect(customer.hash).toHaveLength(40);
	});
});
