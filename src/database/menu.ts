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

	await database.end();
};

fillMenu();
