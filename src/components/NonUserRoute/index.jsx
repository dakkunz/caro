// libs
import useAuth from "@/hooks/useAuth";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const NonUserRoute = (props) => {
	const { user } = useAuth();
	if (user) return <Redirect to="/" />;
	return <Route {...props} />;
};
export default NonUserRoute;
