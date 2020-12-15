import { useMemo } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "@/config/URL";

const useSocket = (url = SOCKET_URL) => {
	const socket = useMemo(() => io(url), [url]);
	return socket;
};

export default useSocket;
