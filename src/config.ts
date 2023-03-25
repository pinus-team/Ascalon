import dotenv from "dotenv";

dotenv.config();

export const config = {
	database_uri: String(process.env.database_uri),
};
