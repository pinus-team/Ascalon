import { Request, Response } from "express";
import { Document, MongoError, ObjectId, WithId } from "mongodb";
import { database } from "../services/database";
import { bodyToNews, INews } from "../types/news_data";

export default [
	{
		path: "/",
		method: "get",
		handler: getNews,
	},
	{
		path: "/:id",
		method: "get",
		handler: getNewsSingular,
	},
	{
		path: "/add",
		method: "post",
		handler: addNews,
	},
	{
		path: "/remove",
		method: "post",
		handler: removeNews,
	},
];

function getNews(req: Request, res: Response) {
	database
		.collection("news")
		.find()
		.toArray()
		.then((docs: Document[]) => {
			res.status(200).send(docs);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

function getNewsSingular(req: Request, res: Response) {
	database
		.collection("news")
		.findOne({ _id: new ObjectId(req.params.id) })
		.then((doc) => {
			if (doc) {
				res.status(200).send(doc);
			} else {
				res.status(404).send("Not found");
			}
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

function addNews(req: Request, res: Response) {
	const news: INews = bodyToNews(req.body);
	database
		.collection("news")
		.updateOne(
			news._id ? { _id: news._id } : { title: news.title },
			{ $set: news },
			{ upsert: true }
		)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

function removeNews(req: Request, res: Response) {
	const news: INews = bodyToNews(req.body);
	database
		.collection("news")
		.deleteOne({ _id: news._id })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}
