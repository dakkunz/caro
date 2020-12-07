// libs
import React from "react";
// pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

const appRoutes = [
	{
		key: "login",
		path: "/login",
		render: () => <Login />,
	},
	{
		key: "register",
		path: "/register",
		render: () => <Register />,
	},
	{
		key: "home",
		path: "/",
		render: () => <Home />,
		exact: true,
	},
	{
		key: "notfound",
		render: () => <NotFound />,
	},
];

export default appRoutes;
