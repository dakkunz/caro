import { useEffect, useState } from "react";
import socket from "@/config/socket";

const useProvideOnline = () => {
	const [list, setList] = useState([]);
	const emitOffline = (userId) => socket.emit("user-offline", userId);
	const emitOnline = (user) => socket.emit("user-online", user);

	useEffect(() => {
		socket.on("user-online", (user) => {
			setList([...list, user]);
		});
		socket.on("user-offline", (userId) =>
			setList(list.filter((user) => user.id !== userId))
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

	return {
		list,
		emitOffline,
		emitOnline,
	};
};

export default useProvideOnline;
