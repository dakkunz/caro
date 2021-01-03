import { API_URL } from "@/config/URL";
import Axios from "axios";

export const AXIOS_INSTANCE = Axios.create({
	baseURL: API_URL,
});

export const doAxiosRequestIntercept = (getAccessTokenSilently) =>
	new Promise((resolve) => {
		AXIOS_INSTANCE.interceptors.request.use(
			async (config) => ({
				...config,
				headers: {
					...config.headers,
					Authorization: `Bearer ${await getAccessTokenSilently()}`,
				},
			}),
			(error) => Promise.reject(error)
		);
		resolve();
	});
