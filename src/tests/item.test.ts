import Item from '../models/item';

describe('item model', () => {
	let item: Item;

	beforeEach(() => {
		item = new Item('c137d22ca65f437f948ca1fd653de4a0', 'abc', 2);
	});

	test('should have itemId with length of 32', () => {
		expect(item.itemId).toHaveLength(32);
	});

	test('should have itemId without any hyphens', () => {
		expect(item.itemId).not.toMatch(/-/g);
	});

	test('should have correct foodId', () => {
		expect(item.foodId).toBe('c137d22ca65f437f948ca1fd653de4a0');
	});

	test('should have correct purchaseId', () => {
		expect(item.purchaseId).toBe('abc');
	});

	test('should have correct quantity', () => {
		expect(item.quantity).toBe(2);
	});

	test('should have default comment of empty', () => {
		expect(item.comment).toBe('');
	});
});
