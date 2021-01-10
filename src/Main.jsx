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
import withEmailVerified from "@/hocs/withEmailVerified";
import { EmailVerify } from "@/routers/lazyRoutes";

const Main = () => {
	const { isLoading, error, getAccessTokenSilently, user } = useAuth0();

	doAxiosRequestIntercept(getAccessTokenSilently);

	return isLoading ? (
		<AuthenticatingIndicator />
	) : error ? (
		<div>Oops... {error.message}</div>
	) : (
		<AppLayout>
			<Switch>
				<Route
					key="email-verify"
					path="/email-verify"
					exact
					component={EmailVerify}
				/>
				<SocketProvider>
					{privateRoutes.map(({ component, ...route }) => (
						<Route
							{...route}
							component={withAuthenticationRequired(
								withEmailVerified(user)(component)
							)}
						/>
					))}
				</SocketProvider>
			</Switch>
		</AppLayout>
	);
};

export default Main;
