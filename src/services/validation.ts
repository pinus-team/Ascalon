import { Db } from "mongodb";

export function addValidation(database: Db) {
	database.command({
		collMod: "menu",
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["title", "description", "price", "category"],
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
						description: "must be a string",
					},
					category: {
						bsonType: "int",
						minimum: 0,
						maximum: 5,
						description: "must be an int and is required",
					},
					addons: {
						bsonType: "array",
						items: {
							bsonType: "object",
							required: ["$ref", "$id"],
							properties: {
								$ref: {
									bsonType: "string",
									description: "what",
								},
								$id: {
									bsonType: "string",
									description: "id is required",
								},
							},
						},
					},
				},
			},
		},
	});
}
