import React from "react";
import { Link } from "react-router-dom";
import { shopRoutes } from "@packages/shared/src/routes/shop";

const Shop = () => {
	return (
		<div>
			<h1>Shop</h1>
			<Link to={shopRoutes.second}>Second</Link>
		</div>
	);
};

export default Shop;
