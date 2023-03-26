import { Double, ObjectId } from "mongodb";

export interface IAddon {
	_id?: ObjectId;
	name: string;
	price: Double;
}

export function bodyToAddon(body: any): IAddon {
	let obj: any = {
		name: body.name,
		price: new Double(body.price),
	};
	if (body._id) obj._id = new ObjectId(body._id);
	return obj;
}
