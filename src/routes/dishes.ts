import { Request, Response } from "express";
import { Document, MongoError } from "mongodb";
import { database } from "../services/database";
import { bodyToDish, IDish } from "../types/dish";
import { dish_cat_join_pipeline, dish_join_pipeline } from "../services/aggregation";

export default [
	{
		path: "/",
		method: "get",
		handler: getDishes,
	},
	{
		path: "/:id",
		method: "get",
		handler: getDishesCat,
	},
	{
		path: "/add",
		method: "post",
		handler: addDish,
	},
	{
		path: "/remove",
		method: "post",
		handler: removeDish,
	},
];

function getDishes(req: Request, res: Response) {
	database
		.collection("menu")
		.aggregate(dish_join_pipeline)
		.toArray()
		.then((docs: Document[]) => {
			res.status(200).send(docs);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

function getDishesCat(req: Request, res: Response) {
	database
		.collection("menu")
		.aggregate(dish_cat_join_pipeline(Number(req.params.id)))
		.toArray()
		.then((docs: Document[]) => {
			res.status(200).send(docs);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

function addDish(req: Request, res: Response) {
	const dish: IDish = bodyToDish(req.body);
	database
		.collection("menu")
		.updateOne(
			dish._id ? { _id: dish._id } : { title: dish.title },
			{ $set: dish },
			{ upsert: true }
		)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

function removeDish(req: Request, res: Response) {
	const dish: IDish = bodyToDish(req.body);
	database
		.collection("menu")
		.deleteOne({ title: dish.title })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}
