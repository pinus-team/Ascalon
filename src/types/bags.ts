import { Double, Int32, ObjectId } from "mongodb";

export interface IBag {
	_id?: ObjectId;
	user_id: ObjectId;
	dish_id: ObjectId;
	addons?: ObjectId[];
	quantity: Int32;
	note: string;
}
export interface IBagItemQuery {
	dish_id: ObjectId;
	addons?: ObjectId[];
	note: string;
}

export function bodyToBagItem(id: string, body: any): IBag {
	let obj: IBag = {
		user_id: new ObjectId(id),
		dish_id: new ObjectId(body.foodId),
		quantity: new Int32(body.quantity),
		note: body.note,
	};
	if (body.addons)
		obj.addons = body.addons.map((addon: any) => new ObjectId(addon));
	return obj;
}

export function bodyToBagItemQuery(body: any): IBagItemQuery {
	let obj: IBagItemQuery = {
		dish_id: new ObjectId(body.foodId),
		note: body.note,
	};
	if (body.addons)
		obj.addons = body.addons.map((addon: any) => new ObjectId(addon));
	return obj;
}
