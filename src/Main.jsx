// libs
import React from "react";
import { Switch } from "react-router-dom";
// components
import AuthenticatingIndicator from "@/components/AuthenticatingIndicator";
import NonUserRoute from "@/components/NonUserRoute";
import PrivateRoute from "@/components/PrivateRoute";
import FloatButton from "@/components/FloatButton";
// hooks
import useAuth from "@/hooks/useAuth";
// routers
import { privateRoutes, publicRoutes } from "@/routers";

const Main = () => {
	const { user } = useAuth();
	return user === null ? (
		<AuthenticatingIndicator />
	) : (
		<>
			<Switch>
				{publicRoutes.map((route) => (
					<NonUserRoute {...route} />
				))}
				{privateRoutes.map((route) => (
					<PrivateRoute {...route} />
				))}
			</Switch>
			{user.email && <FloatButton />}
		</>
	);
};

export default Main;
