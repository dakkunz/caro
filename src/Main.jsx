// libs
import React from "react";
import { Route, Switch } from "react-router-dom";
// components
import AuthenticatingIndicator from "@/components/AuthenticatingIndicator";
import NonUserRoute from "@/components/NonUserRoute";
import PrivateRoute from "@/components/PrivateRoute";
import FloatButton from "@/components/FloatButton";
// hooks
import useAuth from "@/hooks/useAuth";
// routers
import { privateRoutes, publicRoutes, nonUserRoutes } from "@/routers";

const Main = () => {
	const { user } = useAuth();
	return user === null ? (
		<AuthenticatingIndicator />
	) : (
		<>
			<Switch>
				{nonUserRoutes.map((route) => (
					<NonUserRoute {...route} />
				))}
				{privateRoutes.map((route) => (
					<PrivateRoute {...route} />
				))}
				{publicRoutes.map((route) => (
					<Route {...route} />
				))}
			</Switch>
			{user && <FloatButton />}
		</>
	);
};

export default Main;
