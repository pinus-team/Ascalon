import dotenv from "dotenv";

dotenv.config();

export default {
	database_name: process.env.database_name,
	database_uri: `mongodb://${process.env.database_user}:${process.env.database_password}@${process.env.database_host}:${process.env.database_port}/`,
	saltrounds: 10,
	email_regex: new RegExp(
		String.raw`([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])`
	),
	jwt_secret: process.env.jwt_secret? process.env.jwt_secret: '',
	jwt_expiresIn: 30,
};
