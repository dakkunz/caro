import { joinRoomSuccess } from "@/actions/room";
import useSocket from "@/hooks/useSocket";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const GameSocket = () => {
	const socket = useSocket();
	const dispatch = useDispatch();
	const { push } = useHistory();

	useEffect(() => {
		const handleUpdateRoomDetail = (roomInfo) => {
			console.log("receive", "disconnectRoom");
			dispatch(joinRoomSuccess(roomInfo));
		};
		if (socket) {
			socket.on("disconnectRoom", handleUpdateRoomDetail);
		}
		return () => {
			socket.off("disconnectRoom", handleUpdateRoomDetail);
		};
	}, [dispatch, push, socket]);

	return <></>;
};

export default GameSocket;
