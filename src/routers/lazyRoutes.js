import { lazy } from "react";

const delayImport = (ms = 300) => (promise) =>
	promise.then(
		(data) =>
			new Promise((resolve) => {
				setTimeout(() => resolve(data), ms);
			})
	);

export const Home = lazy(() => delayImport()(import("@/pages/Home")));
export const Game = lazy(() => delayImport()(import("@/pages/Game")));
export const NotFound = lazy(() => import("@/pages/NotFound"));
