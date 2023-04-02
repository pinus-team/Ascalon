import { Double, Int32, ObjectId } from "mongodb";

export interface IUser {
	_id?: ObjectId;
	username: string;
	password: string;
	email: string;
	role: Int32;
	first_name: string;
	last_name: string;
	phone_number: string;
	address?: IUserAddress;
}

export interface IUserAddress {
	latitude?: Double;
	longitude?: Double;
	address: string;
	city: string;
	province: string;
	zip_code: string;
}

export interface IUserUpdateForm {
	_id: ObjectId;
	username?: string;
	password?: string;
	email?: string;
	role?: Int32;
	first_name?: string;
	last_name?: string;
	phone_number?: string;
	address?: IUserAddress;
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

export function bodyToUserUpdateForm(body: any): IUserUpdateForm {
	let obj: any = {
		_id: new ObjectId(body._id),
	};
	if (body.address) {
		let address: any = {};
		if (body.address.latitude) address.latitude = new Double(body.address.latitude);
		if (body.address.longitude) address.longitude = new Double(body.address.longitude);
		if (body.address.address) address.address = body.address.address;
		if (body.address.city) address.city = body.address.city;
		if (body.address.province) address.province = body.address.province;
		if (body.address.zip_code) address.zip_code = body.address.zip_code;
		obj.address = address;
	}
	if (body.username) obj.username = body.username;
	if (body.password) obj.password = body.password;
	if (body.email) obj.email = body.email;
	if (body.role) obj.role = new Int32(body.role);
	if (body.first_name) obj.first_name = body.first_name;
	if (body.last_name) obj.last_name = body.last_name;
	if (body.phone_number) obj.phone_number = body.phone_number;
	return obj;
}

export function bodyToLoginData(body: any): ILoginData {
	return {
		username: body.username,
		password: body.password,
	};
}
