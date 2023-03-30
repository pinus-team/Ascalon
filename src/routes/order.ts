import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { database } from "../services/database";
import { IBag } from "../types/bags";
import { bodyToOrder, IOrder } from "../types/order";

export default [
	{
		name: "order",
		path: "/",
		method: "get",
		handler: getOrder,
	},
	{
		name: "order",
		path: "/:id",
		method: "get",
		handler: getOrderSingular,
	},
	{
		name: "order",
		path: "/user/:user_id",
		method: "get",
		handler: getOrderUser,
	},
	{
		name: "order",
		path: "/",
		method: "post",
		handler: addOrder,
	},
];

function getOrder(req: Request, res: Response) {
	database
		.collection<IOrder>("order")
		.find()
		.toArray()
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
}

function getOrderSingular(req: Request, res: Response) {
	database
		.collection<IOrder>("order")
		.findOne({ _id: new ObjectId(req.params.id) })
		.then((doc) => {
			if (doc) {
				res.status(200).send(doc);
			} else {
				res.status(404).send("Not found");
			}
		})
		.catch((err) => {
			res.status(500).send(err);
		});
}

function getOrderUser(req: Request, res: Response) {
	database
		.collection<IOrder>("order")
		.find({ user_id: new ObjectId(req.params.user_id) })
		.toArray()
		.then((doc) => {
			if (doc) {
				res.status(200).send(doc);
			} else {
				res.status(404).send("Not found");
			}
		})
		.catch((err) => {
			res.status(500).send(err);
		});
}

function addOrder(req: Request, res: Response) {
	const order: IOrder = bodyToOrder(req.body);
	database
		.collection<IBag>("bag")
		.deleteMany({ user_id: order.user_id })
		.catch((error) => {
			console.error(error);
		});
	database
		.collection<IOrder>("order")
		.insertOne(order)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
}
