import { lazy } from "react";

const delayImport = (ms = 300) => (promise) =>
	promise.then(
		(data) =>
			new Promise((resolve) => {
				setTimeout(() => resolve(data), ms);
			})
	);

export const Home = lazy(() => delayImport()(import("@/pages/Home")));
export const Room = lazy(() => delayImport()(import("@/pages/Room")));
export const Profile = lazy(() => delayImport()(import("@/pages/Profile")));
export const GameReplay = lazy(() =>
	delayImport()(import("@/pages/GameReplay"))
);
export const EmailVerify = lazy(() =>
	delayImport()(import("@/pages/EmailVerify"))
);
export const BlockedUser = lazy(() =>
	delayImport()(import("@/pages/BlockedUser"))
);
export const NotFound = lazy(() => import("@/pages/NotFound"));
