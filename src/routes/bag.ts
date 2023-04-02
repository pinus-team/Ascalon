import { Request, Response } from "express";
import { Document, MongoError, ObjectId } from "mongodb";
import { bag_join_pipeline } from "../services/aggregation";
import { database } from "../services/database";
import { bodyToBagItem, bodyToBagItemQuery, IBag } from "../types/bags";

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
	{
		path: "/del/:id",
		method: "post",
		handler: pullBagItem,
	},
];

function getBagId(req: Request, res: Response) {
	database
		.collection("bag")
		.aggregate(bag_join_pipeline(new ObjectId(req.params.id)))
		.toArray()
		.then((docs: Document[]) => {
			res.status(200).send(docs);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

async function postBagId(req: Request, res: Response) {
	const bagItem: IBag = bodyToBagItem(req.params.id, req.body);
	database
		.collection<IBag>("bag")
		.insertOne(bagItem)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

async function pullBagItem(req: Request, res: Response) {
	database
		.collection<IBag>("bag")
		.deleteOne({ _id: new ObjectId(req.params.id) })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}
