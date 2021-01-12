import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

const useAuth = () => {
	const { user, ...props } = useAuth0();
	const { info, trophy } = useSelector((state) => state.profile);

	return {
		user: user
			? {
					...user,
					...info,
					trophy,
			  }
			: user,
		...props,
	};
};

export default useAuth;
