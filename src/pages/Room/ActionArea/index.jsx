import useSocket from "@/hooks/useSocket";
import ActionAreaSocket from "@/pages/Room/ActionAreaSocket";
import { ArrowLeftOutlined, SmileOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.scss";

const ActionArea = () => {
	const socket = useSocket();
	const { roomInfo } = useSelector((state) => state.room);
	const { replace } = useHistory();

	return (
		<div className="action-area-wrapper">
			<Button
				danger
				type="primary"
				onClick={() => {
					socket.emit("leave-room", roomInfo.id);
					replace("/");
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
			{socket && <ActionAreaSocket />}
		</div>
	);
};
export default ActionArea;
