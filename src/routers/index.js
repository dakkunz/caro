import React from "react";
import { Home, Login, Register, NotFound } from "@/routers/lazyRoutes";
import { Redirect } from "react-router-dom";

const appRoutes = [
	{
		key: "login",
		path: "/login",
		component: Login,
	},
	{
		key: "register",
		path: "/register",
		component: Register,
	},
	{
		key: "not-found",
		path: "/not-found",
		component: NotFound,
	},
	{
		key: "home",
		path: "/",
		component: Home,
		exact: true,
	},
	{
		key: "404",
		render: () => <Redirect to="/not-found" />,
	},
];

export default appRoutes;
