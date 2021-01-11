import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

const useAuth = () => {
	const { user, ...props } = useAuth0();
	const { info } = useSelector((state) => state.profile);

	return {
		user: {
			...user,
			...info,
		},
		...props,
	};
};

export default useAuth;
