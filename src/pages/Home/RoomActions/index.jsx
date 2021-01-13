import useSocket from "@/hooks/useSocket";
import JoinRoomModal from "@/pages/Home/JoinRoomModal";
import QuickPlayModal from "@/pages/Home/QuickPlayModal";
import RoomActionSocket from "@/pages/Home/RoomActionSocket";
import RoomModal from "@/pages/Home/RoomModal";
import { PlusCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
// import useSocket from "@/hooks/useSocket";
import "./style.scss";

const RoomActions = () => {
	const [showCreate, setShowCreate] = useState(false);
	const [showQuickPlay, setShowQuickPlay] = useState(false);
	const [showJoinRoom, setShowJoinRoom] = useState(false);
	const socket = useSocket();

	const handleQuickPlay = () => {
		setShowQuickPlay(true);
	};

	const cancelFinRival = () => {
		setShowQuickPlay(false);
	};

	return (
		<div className="room-actions-wrapper">
			<Button onClick={() => handleQuickPlay()} type="primary">
				<SmileOutlined />
				Tìm trận nhanh
			</Button>
			<Button onClick={() => setShowCreate(true)} type="primary" danger>
				<PlusCircleOutlined />
				Tạo phòng
			</Button>
			<Button onClick={() => setShowJoinRoom(true)}>
				<PlusCircleOutlined />
				Vào phòng
			</Button>

			<JoinRoomModal show={showJoinRoom} hide={() => setShowJoinRoom(false)} />
			<RoomModal show={showCreate} hide={() => setShowCreate(false)} />
			<QuickPlayModal show={showQuickPlay} hide={() => cancelFinRival()} />
			{socket && <RoomActionSocket />}
		</div>
	);
};
export default RoomActions;
