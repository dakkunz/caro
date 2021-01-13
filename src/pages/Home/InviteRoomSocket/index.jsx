import useSocket from "@/hooks/useSocket";
import { Modal } from "antd";
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

		if (socket) {
			socket.on("receive-invite-request", handleReceiveInvite);
			return () => {
				socket.off("receive-invite-request", handleReceiveInvite);
			};
		}
	}, [dispatch, replace, socket]);

	return <></>;
};

export default InviteRoomSocket;
