import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "../config";

const client = new MongoClient(config.database_uri, {
	serverApi: ServerApiVersion.v1,
});

client.connect();

export const database = client.db("pinus-sylvestris");
addValidation();

export function close() {
	client.close();
}

function addValidation() {
	database.command({
		collMod: "menu",
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: [
					"title",
					"description",
					"price",
					"image_url",
					"category",
				],
				properties: {
					title: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					description: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					price: {
						bsonType: "double",
						description: "must be a double and is required",
					},
					image_url: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					category: {
						bsonType: "int",
						minimum: 0,
						maximum: 5,
						description: "must be an int and is required",
					},
				},
			},
		},
	});
}
