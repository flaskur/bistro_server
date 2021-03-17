create table customer (
	id text,
	email text,
	password text not null,
	first_name text,
	last_name text,
	phone_number text,
	address text,
	verified boolean not null,
	hash text not null,
	primary key (id, email)
);

create table item (
	id text,
	name text,
	category text not null,
	size text,
	price real not null,
	spicy boolean not null,
	description text not null,
	primary key (id, name, size)
);

insert into customer(id, email, password, first_name, last_name, phone_number, address, verified, hash)
values ('1', '2', '3', '', '', '', '', false, '9');