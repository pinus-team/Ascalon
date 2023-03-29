import { Double, Int32, ObjectId } from "mongodb";

export interface IBag {
	_id?: ObjectId;
	user_id: ObjectId;
	items: IBagItem[];
}

export interface IBagItem {
	dish_id: ObjectId;
	addons?: ObjectId[];
	quantity: Int32;
}

export function bodyToBagItem(body: any): IBagItem {
	let obj: IBagItem = {
		dish_id: new ObjectId(body.dish_id),
		quantity: new Int32(body.quantity),
	};
	if (body.addons)
		obj.addons = body.addons.map((addon: any) => new ObjectId(addon));
	return obj;
}
