import { ObjectId, Timestamp } from "mongodb";

export interface INews {
	_id?: ObjectId;
	title: string;
	role: Timestamp;
	content: string;
}

export function bodyToNews(body: any): INews {
	return {
		title: body.title,
		role: new Timestamp(body.role),
		content: body.content,
	};
}
