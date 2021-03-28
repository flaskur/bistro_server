import Purchase from '../models/purchase';
import PurchaseType from '../shared/purchase-type';

describe('purchase model', () => {
	let purchase: Purchase;
	const PA_TAX_RATE = 1.06;

	beforeEach(() => {
		purchase = new Purchase('abc', PurchaseType.TAKE_OUT, 10.0);
	});

	test('should have purchaseId with length of 32', () => {
		expect(purchase.purchaseId).toHaveLength(32);
	});

	test('should have purchaseId without any hyphens', () => {
		expect(purchase.purchaseId).not.toMatch(/-/g);
	});

	test('should have correct purchase type', () => {
		expect(purchase.purchaseType).toBe('TAKE OUT');
	});

	test('should have correct subtotal', () => {
		expect(purchase.subtotal).toBe(10.0);
	});

	test('should have correct total', () => {
		expect(purchase.total).toBeCloseTo(purchase.subtotal * PA_TAX_RATE);
	});

	test('should have empty comment by default', () => {
		expect(purchase.comment).toBe('');
	});
});
