// libs
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
// providers
import AppProviders from "@/providers";
// components
import LoadingIndicator from "@/components/LoadingIndicator";
import Main from "@/Main";
// others

const App = () => (
	<AppProviders>
		<BrowserRouter>
			<Suspense fallback={<LoadingIndicator />}>
				<Main />
			</Suspense>
		</BrowserRouter>
	</AppProviders>
);
export default App;
