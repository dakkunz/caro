import { Home, Game, Room, NotFound } from "@/routers/lazyRoutes";

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
	{
		key: "room",
		path: "/room",
		component: Room,
	},
];

export { publicRoutes, privateRoutes };
