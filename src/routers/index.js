import { Home, Game, NotFound } from "@/routers/lazyRoutes";

const publicRoutes = [
	{
		key: "404",
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
		key: "game",
		path: "/game",
		component: Game,
	},
];

export { publicRoutes, privateRoutes };
