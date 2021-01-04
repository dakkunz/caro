// libs
import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
// components
import AuthenticatingIndicator from "@/components/AuthenticatingIndicator";
// hooks
import SocketProvider from "@/providers/SocketProvider";
// routers
import { privateRoutes } from "@/routers";
import { doAxiosRequestIntercept } from "@/config";
import AppLayout from "@/components/AppLayout";

const Main = () => {
	const { isLoading, error, getAccessTokenSilently } = useAuth0();

	doAxiosRequestIntercept(getAccessTokenSilently);

	return isLoading ? (
		<AuthenticatingIndicator />
	) : error ? (
		<div>Oops... {error.message}</div>
	) : (
		<AppLayout>
			<Switch>
				<SocketProvider>
					{privateRoutes.map(({ component, ...route }) => (
						<Route
							{...route}
							component={withAuthenticationRequired(component)}
						/>
					))}
				</SocketProvider>
			</Switch>
			<Switch></Switch>
		</AppLayout>
	);
};

export default Main;
