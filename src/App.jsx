// libs
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
// providers
import { Provider } from "react-redux";
import AppProviders from "@/providers";
// components
import LoadingIndicator from "@/components/LoadingIndicator";
import Main from "@/Main";
import store from "@/store";
// others

const App = () => (
	<Provider store={store}>
		<AppProviders>
			<BrowserRouter>
				<Suspense fallback={<LoadingIndicator />}>
					<Main />
				</Suspense>
			</BrowserRouter>
		</AppProviders>
	</Provider>
);
export default App;
