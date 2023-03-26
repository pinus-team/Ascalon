import { Request, Response } from "express";
import { Document, MongoError } from "mongodb";
import { database } from "../services/database";
import { bodyToAddon, IAddon } from "../types/addon";

export default [
	{
		path: "/",
		method: "get",
		handler: getAddons,
	},
	{
		path: "/add",
		method: "post",
		handler: addAddon,
	},
	{
		path: "/remove",
		method: "post",
		handler: removeAddon,
	},
];

function getAddons(req: Request, res: Response) {
	database
		.collection("addon")
		.find()
		.toArray()
		.then((docs: Document[]) => {
			res.status(200).send(docs);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

function addAddon(req: Request, res: Response) {
	const addon: IAddon = bodyToAddon(req.body);
	database
		.collection("addon")
		.updateOne(
			addon._id ? { _id: addon._id } : { name: addon.name },
			{ $set: addon },
			{ upsert: true }
		)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500);
			console.error(err);
		});
}

function removeAddon(req: Request, res: Response) {
	const addon: IAddon = bodyToAddon(req.body);
	database
		.collection("addon")
		.deleteOne({ _id: addon._id })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500);
			console.error(err);
		});
}
