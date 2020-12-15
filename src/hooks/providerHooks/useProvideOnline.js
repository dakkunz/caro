import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";

const useProvideOnline = () => {
	const [list, setList] = useState([]);
	const { user } = useAuth();
	const socket = useSocket();
	useEffect(() => {
		socket.on("connect", () => {
			console.log("Client Online: ", socket.id);
			if (user) socket.emit("user-online", { ...user, socketId: socket.id });
		});
		socket.on("user-online", (newUser) =>
			setList((list) => [...list, newUser])
		);
		socket.on("user-offline", (clientId) => {
			console.log("Client offline", clientId);
			setList((list) => list.filter((user) => user.socketId !== clientId));
		});
		socket.on("get-online", (list) => setList(list));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		list,
		setList,
		socket,
	};
};

export default useProvideOnline;
