// libs
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// providers
import AppProviders from "@/providers";
// components
import FloatButton from "@/components/FloatButton";
// others
import appRoutes from "@/routers";
import LoadingIndicator from "@/components/LoadingIndicator";

const App = () => (
	<AppProviders>
		<BrowserRouter>
			<Suspense fallback={<LoadingIndicator />}>
				<Switch>
					{appRoutes.map((route) => (
						<Route {...route} />
					))}
				</Switch>
			</Suspense>
			<FloatButton />
		</BrowserRouter>
	</AppProviders>
);
export default App;
