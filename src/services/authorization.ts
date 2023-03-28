import bcrypt from "bcrypt";
import config from "../config";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user";

interface IJWTPayload {
	user: String;
	role: Number;
}

export const hashPassword = async (password: string) => {
	return bcrypt.hash(password, config.saltrounds);
};

export const checkPassword = async (
	loginPassword: string,
	dbPassword: string
) => {
	return bcrypt.compare(loginPassword, dbPassword);
};

const generatePayloadFromUser = (user: IUser): IJWTPayload => {
	return {
		user: user.username,
		role: Number(user.role),
	};
};

export const generateJWT = (user: IUser): String => {
	const payload: IJWTPayload = generatePayloadFromUser(user);
	return jwt.sign(payload, config.jwt_secret, {
		expiresIn: config.jwt_expiresIn,
	});
};
