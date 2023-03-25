import { Double, Int32, ObjectId } from "mongodb";

export interface IDish {
	id?: ObjectId;
	title: string;
	description: string;
	price: Double;
	image_url: string;
	category: Int32;
}

export function bodyToDish(body: any): IDish {
	return {
		title: body.title,
		description: body.description,
		price: new Double(body.price),
		image_url: body.image_url,
		category: new Int32(body.category),
	};
}
