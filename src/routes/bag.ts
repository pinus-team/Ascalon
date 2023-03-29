import { Request, Response } from "express";
import { Document, MongoError, ObjectId } from "mongodb";
import { database } from "../services/database";
import { bodyToBagItem, IBag, IBagItem } from "../types/bags";
import { bodyToDish, IDish } from "../types/dish";

export default [
	{
		path: "/:id",
		method: "get",
		handler: getBagId,
	},
	{
		path: "/:id",
		method: "post",
		handler: postBagId,
	},
];

function getBagId(req: Request, res: Response) {
	database.collection("bag");
}

function postBagId(req: Request, res: Response) {
	const bagItem: IBagItem = bodyToBagItem(req.body);
	database
		.collection("bag")
		.countDocuments({ user_id: new ObjectId(req.params.id) })
		.then((count) => {
			if (count === 0) {
				database
					.collection("bag")
					.insertOne({
						user_id: new ObjectId(req.params.id),
						items: [],
					})
					.then((result) => {
						res.status(200).send(result);
					})
					.catch((err: MongoError) => {
						res.status(500).send(err);
					});
			}
		});
	database
		.collection<IBag>("bag")
		.updateOne(
			{ user_id: new ObjectId(req.params.id) },
			{ $push: { items: bagItem } }
		)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}
