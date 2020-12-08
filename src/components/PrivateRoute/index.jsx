// libs
import useAuth from "@/hooks/useAuth";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
	const { user } = useAuth();
	if (user === false) return <Redirect to="/login" />;
	return <Route {...props} />;
};
export default PrivateRoute;
