import dotenv from "dotenv";

dotenv.config();

export default {
	database_name : process.env.database_name,
	database_uri: `mongodb://${process.env.database_user}:${process.env.database_password}@${process.env.database_host}:${process.env.database_port}/`
};
