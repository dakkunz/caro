// libs
import React from "react";
import { Route, Switch } from "react-router-dom";
// components
import AuthenticatingIndicator from "@/components/AuthenticatingIndicator";
import NonUserRoute from "@/components/NonUserRoute";
import PrivateRoute from "@/components/PrivateRoute";
import FloatButton from "@/components/FloatButton";
import Navbar from "@/components/Navbar";
// hooks
import useAuth from "@/hooks/useAuth";
import OnlineProvider from "@/providers/OnlineProvider";
// routers
import { privateRoutes, publicRoutes, nonUserRoutes } from "@/routers";

const Main = () => {
	const { user } = useAuth();
	return user === null ? (
		<AuthenticatingIndicator />
	) : (
		<Switch>
			{nonUserRoutes.map((route) => (
				<NonUserRoute {...route} />
			))}
			<OnlineProvider>
				{user && <Navbar />}
				{privateRoutes.map((route) => (
					<PrivateRoute {...route} />
				))}
				{user && <FloatButton />}
			</OnlineProvider>
			{publicRoutes.map((route) => (
				<Route {...route} />
			))}
		</Switch>
	);
};

export default Main;
