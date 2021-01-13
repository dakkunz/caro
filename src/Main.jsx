// libs
import AppLayout from "@/components/AppLayout";
// components
import AuthenticatingIndicator from "@/components/AuthenticatingIndicator";
import FetchUserInfo from "@/components/FetchUserInfo";
import RedirectBlockUser from "@/components/RedirectBlockUser";
import withEmailVerified from "@/hocs/withEmailVerified";
// hooks
import SocketProvider from "@/providers/SocketProvider";
// routers
import { privateRoutes } from "@/routers";
import { BlockedUser, EmailVerify } from "@/routers/lazyRoutes";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Route, Switch } from "react-router-dom";

const Main = () => {
	const { isLoading, error, user } = useAuth0();

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
				<Route key="blocked" path="/blocked" exact component={BlockedUser} />
				<SocketProvider>
					<FetchUserInfo />
					{privateRoutes.map(({ component, ...route }) => (
						<Route
							{...route}
							component={withAuthenticationRequired(
								withEmailVerified(user)(component)
							)}
						/>
					))}
					<RedirectBlockUser />
				</SocketProvider>
			</Switch>
		</AppLayout>
	);
};

export default Main;
