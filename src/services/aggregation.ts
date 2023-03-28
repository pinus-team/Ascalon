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
