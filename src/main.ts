import express from "express";

import dish_endpoints from "./routes/dishes";
import addon_endpoints from "./routes/addons";
import auth_endpoints from "./routes/auth";

const app = express();
const dish_router = express.Router();
const addon_router = express.Router();
const auth_router = express.Router();

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
for (const endpoint of auth_endpoints) {
	switch (endpoint.method) {
		case "get":
			auth_router.get(endpoint.path, endpoint.handler);
			break;
		case "post":
			auth_router.post(endpoint.path, endpoint.handler);
			break;
	}
}

app.use("/dish", dish_router);
app.use("/addon", addon_router);
app.use("/auth", auth_router);

app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
