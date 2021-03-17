import Item from '../models/item';
import Category from '../shared/category';
import Size from '../shared/size';
import database from './database';

// SCRIPT INTENDED FOR RUNNING BEFORE SERVER START
const fillMenu = async () => {
	await database.connect();
	await database.query('delete from item');

	// CREATE ALL ITEM CLASSES AND SAVE

	await new Item('Miso Soup', Category.SOUP, Size.SMALL, 1.99, false).save();
	await new Item('Miso Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Item('Chicken Noodle Soup', Category.SOUP, Size.SMALL, 1.99, false).save();
	await new Item('Chicken Noodle Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Item('Chicken Rice Soup', Category.SOUP, Size.SMALL, 1.99, false).save();
	await new Item('Chicken Rice Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Item('Egg Drop Soup', Category.SOUP, Size.SMALL, 1.99, false).save();
	await new Item('Egg Drop Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Item('Wonton Soup', Category.SOUP, Size.LARGE, 1.99, false).save();
	await new Item('Wonton Soup', Category.SOUP, Size.LARGE, 3.99, false).save();
	await new Item('Asian Hot & Sour Soup', Category.SOUP, Size.SMALL, 2.99, false).save();
	await new Item('Asian Hot & Sour Soup', Category.SOUP, Size.LARGE, 4.99, false).save();
	await new Item('Chinese Hot & Sour Soup', Category.SOUP, Size.SMALL, 2.99, false).save();
	await new Item('Chinese Hot & Sour Soup', Category.SOUP, Size.LARGE, 4.99, false).save();
	await new Item('Tofu w. Vegetable Soup', Category.SOUP, Size.LARGE, 3.99, false).save();

	await database.end();
};

fillMenu();
