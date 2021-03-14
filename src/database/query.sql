create table customer (
	email text primary key,
	password text not null,
	first_name text,
	last_name text,
	phone_number text,
	address text,
	verified boolean not null,
	hash text not null
);