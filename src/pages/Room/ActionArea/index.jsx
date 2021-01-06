import useSocket from "@/hooks/useSocket";
import { ArrowLeftOutlined, SmileOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.scss";

const ActionArea = () => {
	const socket = useSocket();
	const { roomInfo } = useSelector((state) => state.room);
	const { push } = useHistory();

	return (
		<div className="action-area-wrapper">
			<Button
				danger
				type="primary"
				onClick={() => {
					socket.emit("leave-room", roomInfo.id);
					push("/");
				}}
			>
				<ArrowLeftOutlined />
				Leave Room
			</Button>
			<Button
				type="primary"
				onClick={() => {
					socket.emit("start-game-request");
				}}
			>
				<SmileOutlined />
				Play
			</Button>
		</div>
	);
};
export default ActionArea;
