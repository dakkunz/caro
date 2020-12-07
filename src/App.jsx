// libs
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// providers
import AppProviders from "@/providers";
// others
import appRoutes from "@/routers";

const App = () => (
	<AppProviders>
		<BrowserRouter>
			<Switch>
				{appRoutes.map((route) => (
					<Route {...route} />
				))}
			</Switch>
		</BrowserRouter>
	</AppProviders>
);
export default App;
