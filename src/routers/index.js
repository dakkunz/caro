import {
	GameReplay,
	Home,
	NotFound,
	Profile,
	Room,
} from "@/routers/lazyRoutes";

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
		key: "room",
		path: "/room",
		component: Room,
	},
	{
		key: "profile",
		path: "/profile",
		component: Profile,
	},
	{
		key: "game-replay",
		path: "/game-replay/:id",
		component: GameReplay,
	},
];

export { publicRoutes, privateRoutes };
