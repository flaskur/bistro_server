create table customer (
	customer_id text,
	email text,
	password text not null,
	first_name text,
	last_name text,
	phone_number text,
	address text,
	verified boolean not null,
	hash text not null,
	primary key (customer_id, email)
);

create table food (
	food_id text,
	name text,
	category text not null,
	size text,
	price real not null,
	spicy boolean not null,
	description text not null,
	primary key (food_id, name, size)
);

create table item (
	item_id text,
	food_id text,
	purchase_id text,
	quantity int not null,
	comment text not null,
	primary key (item_id, food_id, purchase_id)
);

create table purchase (
	purchase_id text,
	customer_id text,
	purchase_type text not null,
	subtotal real not null,
	total real not null,
	purchase_date date not null,
	purchase_time text not null,
	comment text not null,
	primary key (purchase_id, customer_id)
);

delete from customer;
delete from item;
delete from purchase;