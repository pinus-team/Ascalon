import { MongoError, ObjectId } from "mongodb";
import { database } from "../services/database";
import { bodyToLoginData, bodyToUser, bodyToUserUpdateForm, ILoginData, IUser, IUserUpdateForm } from "../types/user";
import { Request, Response } from "express";
import { checkPassword, generateJWT, hashPassword } from "../services/authorization";
import config from "../config";

export default [
	{
		path: "/:id",
		method: "get",
		handler: userGetHandler,
	},
	{
		path: "/",
		method: "post",
		handler: userPostHandler,
	},
];

function userGetHandler(req: Request, res: Response) {
    database
		.collection("users")
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

function userPostHandler(req: Request, res: Response) {
    const user: IUserUpdateForm = bodyToUserUpdateForm(req.body);
    database
        .collection("users")
        .updateOne(
            { _id: user._id },
            { $set: user },
        )
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err: MongoError) => {
            res.status(500).send(err);
        });
}
