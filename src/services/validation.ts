import { Db } from "mongodb";

export function addValidation(database: Db) {
	// Add validation for user collection
	database.collection("users").createIndex({ username: 1 }, { unique: true });
	database.command({
		collMod: "users",
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["username", "password", "email", "first_name", "last_name", "phone_number", "role"],
				properties: {
					username: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					password: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					email: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					first_name: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					last_name: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					phone_number: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					role: {
						bsonType: "int",
						minimum: 0,
						maximum: 2,
						description: "must be an int and is required",
					},
				},
			},
		},
	});
	// Add validation for menu collection
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
						minItems: 0,
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
	// Add validation for addon collection
	database.command({
		collMod: "addon",
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["name", "price"],
				properties: {
					name: {
						bsonType: "string",
						description: "must be a string and is required",
					},
					price: {
						bsonType: "double",
						description: "must be a double and is required",
					},
				},
			},
		},
	});
}
