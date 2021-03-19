import Food from '../models/food';
import Category from '../shared/category';
import Size from '../shared/size';
import database from './database';

// SCRIPT INTENDED FOR RUNNING BEFORE SERVER START
const fillMenu = async () => {
	await database.connect();
	// CREATE ALL ITEM CLASSES AND SAVE

	await new Food('Miso Soup', Category.SOUP, Size.SMALL, 1.99, false).save();
	await new Food('Miso Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Food('Chicken Noodle Soup', Category.SOUP, Size.SMALL, 1.99, false).save();
	await new Food('Chicken Noodle Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Food('Chicken Rice Soup', Category.SOUP, Size.SMALL, 1.99, false).save();
	await new Food('Chicken Rice Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Food('Egg Drop Soup', Category.SOUP, Size.SMALL, 1.99, false).save();
	await new Food('Egg Drop Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Food('Wonton Soup', Category.SOUP, Size.LARGE, 1.99, false).save();
	await new Food('Wonton Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Food('Asian Hot & Sour Soup', Category.SOUP, Size.SMALL, 2.99, false).save();
	await new Food('Asian Hot & Sour Soup', Category.SOUP, Size.LARGE, 4.99, false).save();
	await new Food('Chinese Hot & Sour Soup', Category.SOUP, Size.SMALL, 2.99, false).save();
	await new Food('Chinese Hot & Sour Soup', Category.SOUP, Size.LARGE, 4.99, false).save();
	await new Food('Tofu w. Vegetable Soup', Category.SOUP, Size.LARGE, 3.99, false).save();

	await new Food('Pizza Roll', Category.APPETIZER, Size.REGULAR, 1.75, false).save();
	await new Food('Egg Roll', Category.APPETIZER, Size.REGULAR, 1.5, false).save();
	await new Food('Shrimp Roll', Category.APPETIZER, Size.REGULAR, 1.6, false).save();
	await new Food('Vegetable Dumplings', Category.APPETIZER, Size.REGULAR, 4.25, false).save();
	await new Food('Fried Wonton', Category.APPETIZER, Size.REGULAR, 4.25, false).save();
	await new Food('Edamame', Category.APPETIZER, Size.REGULAR, 3.5, false).save();
	await new Food('Shumai', Category.APPETIZER, Size.REGULAR, 5.25, false).save();
	await new Food('Lumpia', Category.APPETIZER, Size.REGULAR, 2.99, false).save();
	await new Food('Gyoza', Category.APPETIZER, Size.REGULAR, 4.99, false).save();
	await new Food('Thai Calamari', Category.APPETIZER, Size.REGULAR, 5.99, false).save();
	await new Food('Shrimp Tempura', Category.APPETIZER, Size.REGULAR, 5.99, false).save();
	await new Food('Beef Negimaki', Category.APPETIZER, Size.REGULAR, 7.99, false).save();
	await new Food('Pot Stickers', Category.APPETIZER, Size.REGULAR, 4.99, false).save();
	await new Food('Crab Rangoon', Category.APPETIZER, Size.REGULAR, 4.99, false).save();
	await new Food('Chicken Fingers', Category.APPETIZER, Size.REGULAR, 5.99, false).save();
	await new Food('Chicken Wings', Category.APPETIZER, Size.SMALL, 4.99, false).save();
	await new Food('Chicken Wings', Category.APPETIZER, Size.LARGE, 8.5, false).save();
	await new Food('Baby Back Ribs', Category.APPETIZER, Size.SMALL, 8.99, false).save();
	await new Food('Baby Back Ribs', Category.APPETIZER, Size.LARGE, 17.99, false).save();
	await new Food('Wonton w. Spicy Sauce', Category.APPETIZER, Size.REGULAR, 4.25, true).save();
	await new Food('French Fries', Category.APPETIZER, Size.REGULAR, 2.99, false).save();

	await database.end();
};

fillMenu();
