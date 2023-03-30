import { Double, Int32, ObjectId } from "mongodb";
import { bodyToAddon, IAddon } from "./addon";
import { bodyToDish, IDish } from "./dish";

export interface IOrder {
	_id?: ObjectId;
	user_id: ObjectId;
	delivery_method: string;
	payment_method: string;
	status: Int32;
	items: IOrderItem[];
	totalPrice: Double;
}

export interface IOrderItem {
	_id: ObjectId;
	dish_id: ObjectId;
	quantity: number;
	dish: IDish;
	addons?: IAddon[];
	price: Double;
}

export function bodyToOrder(body: any): IOrder {
	return {
		user_id: new ObjectId(body.user_id),
		delivery_method: body.deliver_method,
		payment_method: body.payment_method,
		status: new Int32(0),
		items: body.items.map((item: any) => bodyToOrderItem(item)),
		totalPrice: new Double(body.totalPrice),
	};
}

export function bodyToOrderItem(body: any): IOrderItem {
	return {
		_id: new ObjectId(body._id),
		dish_id: new ObjectId(body.dish_id),
		quantity: body.quantity,
		dish: bodyToDish(body.dish),
		addons: body.addons.map((addon: any) => bodyToAddon(addon)),
		price: new Double(body.price),
	};
}
