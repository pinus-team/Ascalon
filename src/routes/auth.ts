import { MongoError } from "mongodb";
import { database } from "../services/database";
import { bodyToLoginData, bodyToUser, ILoginData, IUser } from "../types/user";
import { Request, Response } from "express";
import { checkPassword, generateJWT, hashPassword } from "../services/authorization";
import config from "../config";

export default [
	{
		path: "/login",
		method: "post",
		handler: loginHandler,
	},
	{
		path: "/register",
		method: "post",
		handler: registerHandler,
	},
];

function loginHandler(req: Request, res: Response) {
	const loginData: ILoginData = bodyToLoginData(req.body);
	database
		.collection<IUser>("users")
		.findOne({ username: loginData.username })
		.then(async (result) => {
			if (result) {
				if (await checkPassword(loginData.password, result.password)) {
					res.status(200).send(generateJWT(result));
				} else {
					res.status(400).send("Login Failed.");
				}
			} else {
				res.status(400).send("Username not found.");
			}
		})
		.catch((err: MongoError) => {
			res.status(500).send(err);
		});
}

async function registerHandler(req: Request, res: Response) {
	const user: IUser = bodyToUser(req.body);
	if (!config.email_regex.test(user.email)) {
		res.status(400).send("Invalid email address!");
		return;
	}
	user.password = await hashPassword(user.password);
	database
		.collection("users")
		.insertOne(user)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err: MongoError) => {
			res.status(500).send("Username already exists.");
		});
}
