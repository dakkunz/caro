import React from "react";
import { Home, NotFound } from "@/routers/lazyRoutes";
import { Redirect } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const publicRoutes = [
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
];

const privateRoutes = [
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

export { publicRoutes, privateRoutes };
