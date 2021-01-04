import useRouter from "@/hooks/useRouter";
import ActionArea from "@/pages/Room/ActionArea";
import ChatArea from "@/pages/Room/ChatArea";
import PlayerArea from "@/pages/Room/PlayersArea";
import ViewersArea from "@/pages/Room/ViewersArea";
import withRoomInfoRequired from "@/pages/Room/withRoomInfoRequired";
import React from "react";
import "./style.scss";

const Room = () => {
	const router = useRouter();
	const { roomInfo } = router.location.state || {};

	console.log(roomInfo);

	return withRoomInfoRequired(roomInfo)(
		<div className="room-wrapper">
			<div className="left">
				<PlayerArea />
				<ChatArea />
			</div>
			<div className="right">
				<ViewersArea />
				<ActionArea />
			</div>
		</div>
	);
};
export default Room;
