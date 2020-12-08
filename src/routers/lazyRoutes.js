import { lazy } from "react";

const delayImport = (ms = 300) => (promise) =>
	promise.then(
		(data) =>
			new Promise((resolve) => {
				setTimeout(() => resolve(data), ms);
			})
	);

export const Home = lazy(() => delayImport()(import("@/pages/Home")));
export const Login = lazy(() => delayImport()(import("@/pages/Login")));
export const Register = lazy(() => delayImport()(import("@/pages/Register")));
export const NotFound = lazy(() => import("@/pages/NotFound"));
