import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import ActionAreaSocket from "@/pages/Room/ActionAreaSocket";
import { ArrowLeftOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.scss";

const ActionArea = () => {
	const socket = useSocket();
	const { roomInfo } = useSelector((state) => state.room);
	const { user } = useAuth();
	const { replace } = useHistory();

	const isHost = user.sub === roomInfo.host.sub;

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
				Rời phòng
			</Button>
			<Button
				type="primary"
				disabled={!isHost}
				onClick={() => {
					if (roomInfo.players.X !== null && roomInfo.players.O !== null)
						socket.emit("start-game-request");
					else message.error("Chưa đủ người");
				}}
			>
				<SmileOutlined />
				Bắt đầu
			</Button>
			{socket && <ActionAreaSocket />}
		</div>
	);
};
export default ActionArea;
