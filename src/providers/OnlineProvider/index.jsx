import { onlineContext } from "@/contexts";
import useProvideOnline from "@/hooks/providerHooks/useProvideOnline";

const OnlineProvider = ({ children }) => {
	const value = useProvideOnline();
	return (
		<onlineContext.Provider value={value}>{children}</onlineContext.Provider>
	);
};

export default OnlineProvider;
