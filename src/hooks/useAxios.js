import { API_URL } from "@/config/URL";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";

const AXIOS_INSTANCE = axios.create({
	baseURL: API_URL,
});

const useAxios = () => {
	const { getAccessTokenSilently, user } = useAuth0();
	useEffect(() => {
		AXIOS_INSTANCE.interceptors.request.use(
			async (config) => ({
				...config,
				headers: {
					...config.headers,
					Authorization: `Bearer ${await getAccessTokenSilently()}`,
				},
				data: {
					...config.data,
					user,
				},
			}),
			(error) => Promise.reject(error)
		);
	}, [getAccessTokenSilently, user]);

	return AXIOS_INSTANCE;
};

export default useAxios;
