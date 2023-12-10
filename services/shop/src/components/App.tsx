import { Outlet } from "react-router-dom";

const App = () => {
	return (
		<div>
			<h1>SHOP</h1>
			<br />
			<Outlet />
		</div>
	);
};

export default App;
