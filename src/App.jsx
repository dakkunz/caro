// libs
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
// providers
import { Provider } from "react-redux";
// components
import LoadingIndicator from "@/components/LoadingIndicator";
import Main from "@/Main";
// others
import store from "@/store";
import authConfig from "@/config/auth.json";
import history from "@/utils/history";

const onRedirectCallback = (appState) => {
	history.push(
		appState && appState.returnTo ? appState.returnTo : window.location.pathname
	);
};
const App = () => (
	<Auth0Provider
		domain={authConfig.domain}
		clientId={authConfig.clientId}
		audience={authConfig.audience}
		redirectUri={window.location.origin}
		onRedirectCallback={onRedirectCallback}
	>
		<Provider store={store}>
			<BrowserRouter>
				<Suspense fallback={<LoadingIndicator />}>
					<Main />
				</Suspense>
			</BrowserRouter>
		</Provider>
	</Auth0Provider>
);
export default App;
