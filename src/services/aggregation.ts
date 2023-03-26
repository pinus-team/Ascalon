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
