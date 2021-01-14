import { updateRoomList } from "@/actions/roomList";
import useSocket from "@/hooks/useSocket";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const RoomListSocket = () => {
	const socket = useSocket();
	const dispatch = useDispatch();
	useEffect(() => {
		socket.emit("get-current-room-list");
	}, [socket]);

	useEffect(() => {
		const handleGetRoomList = (list) => {
			console.log({ list });
			dispatch(updateRoomList(list));
		};
		socket.off("get-current-room-list");
		socket.on("get-current-room-list", handleGetRoomList);
		return () => {
		};
	}, [dispatch, socket]);

	return <></>;
};

export default RoomListSocket;
