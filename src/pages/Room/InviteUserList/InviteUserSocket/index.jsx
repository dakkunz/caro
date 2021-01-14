import { updateOnlineUser } from "@/actions/onlineUsers";
import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const InviteUserSocket = () => {
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
			dispatch(
				updateOnlineUser(list.filter(({ sub }) => sub && sub !== user.sub))
			);
		};
		socket.off("update-user-online-list");
		socket.on("update-user-online-list", handleUpdateOnlineList);
		return () => {

		};
	}, [dispatch, socket, user.sub]);

	return <></>;
};
export default InviteUserSocket;