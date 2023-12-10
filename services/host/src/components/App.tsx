import { Link, Outlet } from "react-router-dom";
import { adminRoutes } from "@packages/shared/src/routes/admin";
import { shopRoutes } from "@packages/shared/src/routes/shop";

const App = () => {
	return (
		<div>
			<h1>Hello world</h1>
			<br />
			<Link to={adminRoutes.about}>ABOUT</Link>
			<br />
			<Link to={shopRoutes.main}>SHOP MAIN</Link>
			<br />
			{/* <Link to="/shop/second">SHOP SECONDARY</Link>
			<br /> */}
			<Outlet />
		</div>
	);
};

export default App;
