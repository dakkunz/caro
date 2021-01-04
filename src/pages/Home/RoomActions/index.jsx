import QuickPlayModal from "@/pages/Home/QuickPlayModal";
import RoomModal from "@/pages/Home/RoomModal";
import { PlusCircleTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import "./style.scss";

const RoomActions = () => {
	const [showCreate, setShowCreate] = useState(false);
	const [showQuickPlay, setShowQuickPlay] = useState(false);

	return (
		<div className="room-actions-wrapper">
			<Button onClick={() => setShowQuickPlay(true)}>
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
		</div>
	);
};
export default RoomActions;
