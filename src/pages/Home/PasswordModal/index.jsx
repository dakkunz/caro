import { SOCKET_TYPES } from "@/constants/socketTypes";
import useSocket from "@/hooks/useSocket";
import { Input, message, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const PasswordModal = ({ show, hide }) => {
	const [password, setPassword] = useState("");
	const { selectedRoom } = useSelector((state) => state.roomList);
	const socket = useSocket();
	return (
		<Modal
			title="Enter Password"
			centered
			width={400}
			closable
			okText="Join"
			onCancel={hide}
			visible={show}
			onOk={() => {
				if (!password.length) {
					message.error("Empty Password");
				} else {
					socket.emit(SOCKET_TYPES.JOIN_ROOM_REQUEST, selectedRoom, password);
					setPassword("");
					hide();
				}
			}}
		>
			<Input.Password
				autoComplete="off"
				size="large"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
		</Modal>
	);
};

export default PasswordModal;
