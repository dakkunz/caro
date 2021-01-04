import { SOCKET_TYPES } from "@/constants/socketTypes";
import useSocket from "@/hooks/useSocket";
import { Input } from "antd";
import React, { useState } from "react";
import "./style.scss";

const ChatInput = () => {
	const [mes, setMes] = useState("");
	const socket = useSocket();

	return (
		<Input.Search
			className="chat-input-wrapper"
			value={mes}
			onChange={(e) => setMes(e.target.value)}
			onSearch={(value) => {
				if (value) {
					socket.emit(SOCKET_TYPES.ROOM__SEND_CHAT, value);
					setMes("");
				}
			}}
			enterButton="Send"
		/>
	);
};

export default ChatInput;
