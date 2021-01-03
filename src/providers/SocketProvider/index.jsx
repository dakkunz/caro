import { socketContext } from "@/contexts";
import useProvideSocket from "@/hooks/useProvideSocket";

const SocketProvider = ({ children }) => {
	const socketInstance = useProvideSocket();
	return (
		<socketContext.Provider value={socketInstance}>
			{children}
		</socketContext.Provider>
	);
};
export default SocketProvider;
