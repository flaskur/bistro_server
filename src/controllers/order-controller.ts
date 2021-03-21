import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Purchase from '../models/purchase';
import Item from '../models/item';
import nodemailer from 'nodemailer';

dotenv.config();

const postOrder = async (request: Request, response: Response) => {
	// need to create a purchase entry and all items in the cart
	// we need to be passed the jwt token to verify customer id
	// need shopping cart as an array of items, which need to be populated after purchase instance
	// you need the type of order, and phone number + address for delivery. for takeout you just need your phone number
	// might be wise to do phone verification instead or along with email. from a ux standpoint, id rather just add stuff to cart and deal with auth later.
	// i add all the stuff i want, then it will prompt me to create an account / verify phone before ordering
	// i think i should make the registration more extensive and require phone verification.
	// we could just allow a fake phone to be input without verification, but at least their email needs to be valid.

	// on success you should send confirmation email to user and to bistro, maybe generate pdf?
	// consider adding CC info to customer table, or require it each time but don't save just include with email, extract from request body

	// you should include name, phone, and address in request body form
	const { token, bodyCart, purchaseType } = request.body;

	console.log(token, bodyCart, purchaseType);

	const cart = JSON.parse(bodyCart);

	console.log(cart);

	if (!token) {
		return response.json({
			success: false,
			message: 'INVALID AUTH TOKEN',
		});
	}
	if (!cart) {
		return response.json({
			success: false,
			message: 'EMPTY CART',
		});
	}

	const verifiedToken = jwt.verify(token, process.env.JWT_KEY!) as TokenShape; // this can fail, need to cast
	console.log(verifiedToken.customerId, verifiedToken.email);

	const subtotal = cart.reduce((total: number, item: ItemProps) => {
		return total + item.quantity * item.price;
	}, 0);
	const purchase = new Purchase(verifiedToken.customerId, purchaseType, subtotal);
	const result = await purchase.save();

	// maybe group purchase and item saves together
	if (!result) {
		return response.json({
			success: false,
			message: 'FAILED PURCHASE SAVE',
		});
	}

	// create items and add to table for records
	for (let cartItem of cart) {
		let item = new Item(cartItem.foodId, purchase.purchaseId, cartItem.quantity, cartItem.comment);
		let result = await item.save();
		if (!result) {
			return response.json({
				success: false,
				message: 'FAILED ITEM SAVE',
			});
		}
	}

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 8000,
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	// send to customer --> should include purchase details for renderCart or a separate method
	await transporter.sendMail({
		from: process.env.EMAIL,
		to: process.env.EMAIL2,
		subject: 'Bistro Order Confirmation',
		html: `
			<div>
				<h3 style="background-color: pink">Bistro Order Confirmation</h3>
				${renderCart(cart)} 
			</div>
		`,
	});

	// send to bistro
	await transporter.sendMail({
		from: process.env.EMAIL,
		to: process.env.EMAIL,
		subject: 'New Customer Order',
		html: `
			<div>
				<h3 style="background-color: pink">Bistro Order Confirmation</h3>
				${renderCart(cart)}
			</div>
		`,
	});

	return response.json({
		success: true,
		message: 'SUCCESSFUL POST ORDER',
	});
};

// need to return a string
const renderCart = (cart: ItemProps[]): string => {
	let items = '';

	cart.map(item => {
		items += `<h3 style="background-color: pink">foodid ${item.foodId} quantity ${item.quantity} price ${item.price}</h3>\n`;
	});

	return items;
};

const orderController = {
	postOrder,
};

// let cart have price to make it easier
// maybe should include name too
interface ItemProps {
	foodId: string;
	quantity: number;
	price: number;
}

interface TokenShape {
	customerId: string;
	email: string;
}

export default orderController;
