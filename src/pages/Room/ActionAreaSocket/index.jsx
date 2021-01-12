import { joinRoomSuccess } from "@/actions/room";
import useSocket from "@/hooks/useSocket";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const ActionAreaSocket = () => {
	const socket = useSocket();
	const dispatch = useDispatch();
	const { push } = useHistory();

	useEffect(() => {
		const handleUpdateRoomDetail = (roomInfo) => {
			console.log("receive", "room-detail-update");
			dispatch(joinRoomSuccess(roomInfo));
		};
		if (socket) {
			socket.on("room-detail-update", handleUpdateRoomDetail);
		}
		return () => {
			socket.off("room-detail-update", handleUpdateRoomDetail);
		};
	}, [dispatch, push, socket]);

	return <></>;
};

export default ActionAreaSocket;
