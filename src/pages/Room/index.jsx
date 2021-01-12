import Game from "@/components/Game";
import ActionArea from "@/pages/Room/ActionArea";
import InviteUserList from "@/pages/Room/InviteUserList";
import PlayerArea from "@/pages/Room/PlayersArea";
import withRoomInfoRequired from "@/pages/Room/withRoomInfoRequired";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const Room = () => {
	const { isJoinGame, roomInfo } = useSelector((state) => state.room);

	return withRoomInfoRequired(roomInfo)(
		<>
			{isJoinGame ? (
				<Game />
			) : (
				<div className="room-wrapper">
					<PlayerArea />
					<div className="right">
						<InviteUserList
							withInvite
							title="Mời người chơi"
							filter={(user) =>
								user.sub !== (roomInfo.players.X || {}).sub &&
								user.sub !== (roomInfo.players.O || {}).sub
							}
						/>
						<ActionArea />
					</div>
				</div>
			)}
		</>
	);
};
export default Room;
