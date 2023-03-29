import { Double, Int32, ObjectId } from "mongodb";

export interface IBag {
	_id?: ObjectId;
	user_id: ObjectId;
	items: IBagItem[];
}

export interface IBagItem {
	dish_id: ObjectId;
	addons: ObjectId[];
	quantity: Int32;
}

export function bodyToBagItem(body: any): IBagItem {
	return {
		dish_id: new ObjectId(body.dish_id),
		addons: body.addons.map((addon: any) => new ObjectId(addon._id)),
		quantity: new Int32(body.quantity),
	};
}
