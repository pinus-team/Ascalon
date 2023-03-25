import express from "express";
import { Document, MongoError } from "mongodb";
import { database } from "./services/database";
import { bodyToDish, IDish } from "./types/dish";

const app = express();
const dish_router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dish_router.get("/dishes", (req, res) => {
	database
		.collection("menu")
		.find()
		.toArray()
		.then((docs: Document[]) => {
			res.status(200).send(docs);
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
});

dish_router.post("/add", (req, res) => {
	const dish: IDish = bodyToDish(req.body);
	database
		.collection("menu")
		.updateOne({ title: dish.title }, { $set: dish }, { upsert: true })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500);
			console.error(err);
		});
});

dish_router.post("/remove", (req, res) => {
	const dish: IDish = bodyToDish(req.body);
	database
		.collection("menu")
		.deleteOne({ title: dish.title })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500);
			console.error(err);
		});
});

app.use("/dish", dish_router);

app.listen(3001, () => {
	console.log("Server is running on port 3001");
});
