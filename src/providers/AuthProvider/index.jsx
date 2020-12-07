import { authContext } from "@/contexts";
import useProvideAuth from "@/hooks/providerHooks/useProvideAuth";

const AuthProvider = ({ children }) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default AuthProvider;
