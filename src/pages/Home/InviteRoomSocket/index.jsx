import useSocket from "@/hooks/useSocket";
import { Modal } from "antd";
import {message} from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const InviteRoomSocket = () => {
	const socket = useSocket();
	const dispatch = useDispatch();
	const { replace } = useHistory();

	useEffect(() => {
		const handleReceiveInvite = (roomInfo) => {
			Modal.confirm({
				title: roomInfo.host.nickname + " mời bạn vào phòng!",
				onOk: () => {
					console.log("da chap nhan");
					socket.emit("reply-invite-request", {
						isAccept: true,
						roomInfo,
					});
				},
				onCancel: () => {
					socket.emit("reply-invite-request", {
						isAccept: false,
						roomInfo,
					});
				},
			});
		};

		const declineReplyJoinRoom = (mes) => {
			message.error(mes);
		}

		if (socket) {
			socket.off("receive-invite-request");
			socket.on("receive-invite-request", handleReceiveInvite);
			socket.off("decline-reply-join-room");
			socket.on("decline-reply-join-room", declineReplyJoinRoom)
			return () => {
			};
		}
	}, [dispatch, replace, socket]);

	return <></>;
};

export default InviteRoomSocket;
