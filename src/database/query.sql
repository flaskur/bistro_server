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

insert into customer(id, email, password, first_name, last_name, phone_number, address, verified, hash)
values ('1', '2', '3', '', '', '', '', false, '9');