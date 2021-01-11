import Game from "@/components/Game";
import useRouter from "@/hooks/useRouter";
import OnlineUserList from "@/pages/Home/OnlineUserList";
import ActionArea from "@/pages/Room/ActionArea";
import ChatArea from "@/pages/Room/ChatArea";
import PlayerArea from "@/pages/Room/PlayersArea";
import withRoomInfoRequired from "@/pages/Room/withRoomInfoRequired";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const Room = () => {
	const router = useRouter();
	const { roomInfo } = router.location.state || {};

	const { isJoinGame } = useSelector((state) => state.room);

	return withRoomInfoRequired(roomInfo)(
		<>
			{isJoinGame ? (
				<Game />
			) : (
				<div className="room-wrapper">
					<div className="left">
						<PlayerArea />
						<ChatArea />
					</div>
					<div className="right">
						<OnlineUserList />
						<ActionArea />
					</div>
				</div>
			)}
		</>
	);
};
export default Room;
