import Food from '../models/food';
import Category from '../shared/category';
import Size from '../shared/size';

describe('food model', () => {
	let food: Food;

	beforeEach(() => {
		food = new Food('Miso Soup', Category.SOUP, Size.SMALL, 1.99, false, '');
	});

	test('should have foodId with length of 32', () => {
		expect(food.foodId).toHaveLength(32);
	});

	test('should have foodId without any hyphens', () => {
		expect(food.foodId).not.toMatch(/-/g);
	});

	test('should have correct food name', () => {
		expect(food.name).toBe('Miso Soup');
	});

	test('should have correct category', () => {
		expect(food.category).toBe('SOUP');
	});

	test('should have correct size', () => {
		expect(food.size).toBe('SM');
	});

	test('should have correct price', () => {
		expect(food.price).toBe(1.99);
	});

	test('should have correct spicy marker', () => {
		expect(food.spicy).toBe(false);
	});

	test('should have empty description', () => {
		expect(food.description).toBe('');
	});
});
