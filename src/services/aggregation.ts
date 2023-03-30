import { ObjectId } from "mongodb";

export const dish_join_pipeline = [
	{
		$set: {
			addons: {
				$map: {
					input: {
						$map: {
							input: "$addons",
							in: {
								$arrayElemAt: [
									{
										$objectToArray: "$$this",
									},
									1,
								],
							},
						},
					},
					in: {
						$toObjectId: "$$this.v",
					},
				},
			},
		},
	},
	{
		$lookup: {
			from: "addon",
			localField: "addons",
			foreignField: "_id",
			as: "addons",
		},
	},
];

export const dish_cat_join_pipeline = (cat: Number) => [
	{
		$match: {
			category: cat,
		},
	},
	{
		$set: {
			addons: {
				$map: {
					input: {
						$map: {
							input: "$addons",
							in: {
								$arrayElemAt: [
									{
										$objectToArray: "$$this",
									},
									1,
								],
							},
						},
					},
					in: {
						$toObjectId: "$$this.v",
					},
				},
			},
		},
	},
	{
		$lookup: {
			from: "addon",
			localField: "addons",
			foreignField: "_id",
			as: "addons",
		},
	},
];

export const bag_join_pipeline = (user_id: ObjectId) => [
	{
		$match: {
			user_id: user_id,
		},
	},
	{
		$lookup: {
			from: "menu",
			localField: "dish_id",
			foreignField: "_id",
			as: "dish",
		},
	},
	{
		$lookup: {
			from: "addon",
			localField: "addons",
			foreignField: "_id",
			as: "addons",
		},
	},
	{
		$set: {
			dish: {
				$arrayElemAt: ["$dish", 0],
			},
		},
	},
	{
		$set: {
			price: {
				$multiply: [
					{
						$sum: [
							{
								$reduce: {
									input: "$addons",
									initialValue: 0,
									in: {
										$sum: ["$$value", "$$this.price"],
									},
								},
							},
							"$dish.price",
						],
					},
					"$quantity",
				],
			},
		},
	},
	{
		$sort: {
			_id: 1,
		},
	},
];

export const order_join_pipeline = [
	{
		$lookup: {
			from: "users",
			localField: "user_id",
			foreignField: "_id",
			as: "user_data",
		},
	},
	{
		$set: {
			user_data: {
				$arrayElemAt: ["$user_data", 0],
			},
		},
	},
];

export const order_join_pipeline_with_id = (id: ObjectId) => [
	{
		$match: {
			_id: id,
		},
	},
	{
		$lookup: {
			from: "users",
			localField: "user_id",
			foreignField: "_id",
			as: "user_data",
		},
	},
	{
		$set: {
			user_data: {
				$arrayElemAt: ["$user_data", 0],
			},
		},
	},
];
