import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
	order_join_pipeline,
	order_join_pipeline_with_id,
} from "../services/aggregation";
import { database } from "../services/database";
import { IBag } from "../types/bags";
import { bodyToOrder, bodyToOrderUpdateForm, IOrder, IOrderUpdateForm } from "../types/order";

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
		path: "/:id",
		method: "post",
		handler: updateOrder,
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
		.aggregate(order_join_pipeline)
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
		.aggregate(order_join_pipeline_with_id(new ObjectId(req.params.id)))
		.toArray()
		.then((doc) => {
			if (doc) {
				res.status(200).send(doc[0]);
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

function updateOrder(req: Request, res: Response) {
    const order: IOrderUpdateForm = bodyToOrderUpdateForm(req.body);
    database
        .collection<IOrder>("order")
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: order })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}
