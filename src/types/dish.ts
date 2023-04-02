import { DBRef, Double, Int32, ObjectId } from "mongodb";
import { json } from "stream/consumers";
import { IAddon } from "./addon";

export interface IDish {
	_id?: ObjectId;
	title: string;
	description: string;
	price: Double;
	image_url: string;
	category: Int32;
	addons: DBRef[];
}

export function bodyToDish(body: any): IDish {
	let obj: any = {
		title: body.title,
		description: body.description,
		price: new Double(body.price),
		image_url: body.image_url,
		category: new Int32(body.category),
		addons: body.addons
			? body.addons.map((addon: any) => new DBRef("addon", addon))
			: [],
	};
	if (body._id) obj._id = new ObjectId(body._id);
	return obj;
}
