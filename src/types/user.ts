import { Int32, ObjectId } from "mongodb";

export interface IUser {
	_id?: ObjectId;
	username: string;
	password: string;
	email: string;
	role: Int32;
	first_name: string;
	last_name: string;
	phone_number: string;
}

export interface ILoginData {
	username: string;
	password: string;
}

export function bodyToUser(body: any): IUser {
	return {
		username: body.username,
		password: body.password,
		email: body.email,
		role: new Int32(body.role),
		first_name: body.first_name,
		last_name: body.last_name,
		phone_number: body.phone_number,
	};
}

export function bodyToLoginData(body: any): ILoginData {
	return {
		username: body.username,
		password: body.password,
	};
}
