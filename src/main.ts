import express from "express";

import dish_endpoints from "./routes/dishes";
import addon_endpoints from "./routes/addons";
import auth_endpoints from "./routes/auth";
import news_endpoints from "./routes/news";
import user_endpoints from "./routes/user";
import bag_endpoints from "./routes/bag";
import order_endpoints from "./routes/order";

const app = express();
const dish_router = express.Router();
const addon_router = express.Router();
const auth_router = express.Router();
const news_router = express.Router();
const user_router = express.Router();
const bag_router = express.Router();
const order_router = express.Router();

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
for (const endpoint of news_endpoints) {
	switch (endpoint.method) {
		case "get":
			news_router.get(endpoint.path, endpoint.handler);
			break;
		case "post":
			news_router.post(endpoint.path, endpoint.handler);
			break;
	}
}
for (const endpoint of user_endpoints) {
	switch (endpoint.method) {
		case "get":
			user_router.get(endpoint.path, endpoint.handler);
			break;
		case "post":
			user_router.post(endpoint.path, endpoint.handler);
			break;
	}
}
for (const endpoint of bag_endpoints) {
	switch (endpoint.method) {
		case "get":
			bag_router.get(endpoint.path, endpoint.handler);
			break;
		case "post":
			bag_router.post(endpoint.path, endpoint.handler);
			break;
	}
}
for (const endpoint of order_endpoints) {
	switch (endpoint.method) {
		case "get":
			order_router.get(endpoint.path, endpoint.handler);
			break;
		case "post":
			order_router.post(endpoint.path, endpoint.handler);
			break;
	}
}

app.use("/dish", dish_router);
app.use("/addon", addon_router);
app.use("/auth", auth_router);
app.use("/news", news_router);
app.use("/user", user_router);
app.use("/bag", bag_router);
app.use("/order", order_router);

app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
