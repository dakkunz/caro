import QuickPlayModal from "@/pages/Home/QuickPlayModal";
import RoomModal from "@/pages/Home/RoomModal";
import { PlusCircleTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import useSocket from "@/hooks/useSocket";
import "./style.scss";
import useAuth from "@/hooks/useAuth";
import RoomActionSocket from "@/pages/Home/RoomActionSocket";

const RoomActions = () => {
	const [showCreate, setShowCreate] = useState(false);
	const [showQuickPlay, setShowQuickPlay] = useState(false);
	const { user } = useAuth();
	const socket = useSocket();

	const findRival = () => {
		socket.emit("join-room-quick", user);
	};

	const handleQuickPlay = () => {
		findRival();
		setShowQuickPlay(true);
	};
	return (
		<div className="room-actions-wrapper">
			<Button onClick={() => handleQuickPlay()}>
				<SmileTwoTone />
				Quick Play
			</Button>
			<Button onClick={() => setShowCreate(true)}>
				<PlusCircleTwoTone />
				Create Room
			</Button>

			<RoomModal show={showCreate} hide={() => setShowCreate(false)} />
			<QuickPlayModal
				show={showQuickPlay}
				hide={() => setShowQuickPlay(false)}
			/>
			{socket && <RoomActionSocket />}
		</div>
	);
};
export default RoomActions;
