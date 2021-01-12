import { updateOnlineUser } from "@/actions/onlineUsers";
import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const OnlineUserSocket = () => {
	const socket = useSocket();
	const dispatch = useDispatch();
	const { user } = useAuth();

	useEffect(() => {
		console.log("Emit", "get-user-online-list");
		socket.emit("get-user-online-list");
	}, [socket]);

	useEffect(() => {
		const handleUpdateOnlineList = (list) => {
			console.log("Receive", "update-user-online-list", list);
			dispatch(updateOnlineUser(list.filter(({ sub }) => sub !== user.sub)));
		};

		socket.on("update-user-online-list", handleUpdateOnlineList);
		return () => {
			socket.off("update-user-online-list", handleUpdateOnlineList);
		};
	}, [dispatch, socket, user.sub]);

	return <></>;
};
export default OnlineUserSocket;
