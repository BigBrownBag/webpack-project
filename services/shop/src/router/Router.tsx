import App from "@/components/App";
import { createBrowserRouter } from "react-router-dom";
import { Shop } from "@/pages/shop";
import { Suspense } from "react";

const routes = [
	{
		path: "/shop",
		element: <App />,
		children: [
			{
				path: "/shop/main",
				element: (
					<Suspense fallback={"Loading..."}>
						<Shop />
					</Suspense>
				),
			},
			{
				path: "/shop/second",
				element: (
					<Suspense fallback={"Loading..."}>
						<h1 style={{ color: "red" }}>Second</h1>
					</Suspense>
				),
			},
		],
	},
];

export const router = createBrowserRouter(routes);

export default routes;
