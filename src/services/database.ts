import { MongoClient, ServerApiVersion } from "mongodb";
import config from "../config";
import { addValidation } from "./validation";

const client = new MongoClient(config.database_uri, {
	serverApi: ServerApiVersion.v1,
});

client.connect();

export const database = client.db(config.database_name);
addValidation(database);

export function close() {
	client.close();
}
