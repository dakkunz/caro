import { joinRoomSuccess } from "@/actions/room";
import { SOCKET_TYPES } from "@/constants/socketTypes";
import useSocket from "@/hooks/useSocket";
import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const RoomActionSocket = () => {
	const socket = useSocket();
	const dispatch = useDispatch();
	const { replace } = useHistory();

	useEffect(() => {
		const handleJoinRoomSuccess = (roomInfo) => {
			dispatch(joinRoomSuccess(roomInfo));
			replace("/room", { roomInfo });
		};
		const handleJoinRoomFail = (mes) => {
			message.error(mes);
		};
		if (socket) {
			socket
				.on(SOCKET_TYPES.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess)
				.on("join-room-quick-success", handleJoinRoomSuccess)
				.on("join-room-fail", handleJoinRoomFail);
		}
		return () => {
			socket
				.off(SOCKET_TYPES.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess)
				.off("join-room-quick-success", handleJoinRoomSuccess)
				.off("join-room-fail", handleJoinRoomFail);
		};
	}, [dispatch, replace, socket]);

	return <></>;
};

export default RoomActionSocket;
