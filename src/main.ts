import express from "express";

import dish_endpoints from "./routes/dishes";
import addon_endpoints from "./routes/addons";

const app = express();
const dish_router = express.Router();
const addon_router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const endpoint of dish_endpoints) {
	switch (endpoint.method) {
		case "get":
			dish_router.get(endpoint.path, endpoint.handler);
			break;
		case "post":
			dish_router.post(endpoint.path, endpoint.handler);
			break;
	}
}
for (const endpoint of addon_endpoints) {
	switch (endpoint.method) {
		case "get":
			addon_router.get(endpoint.path, endpoint.handler);
			break;
		case "post":
			addon_router.post(endpoint.path, endpoint.handler);
			break;
	}
}

app.use("/dish", dish_router);
app.use("/addon", addon_router);

app.listen(3001, () => {
	console.log("Server is running on port 3001");
});
