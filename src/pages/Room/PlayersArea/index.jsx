import PlayerPlace from "@/pages/Room/PlayerPlace";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const PlayerArea = () => {
	const { roomInfo } = useSelector((state) => state.room);
	const { user } = useAuth0();
	const { players = { playerX: user, playerO: user } } = roomInfo || {};
	return (
		<div className="players-area-wrapper">
			<PlayerPlace player={players.playerX} type="X" />
			<PlayerPlace player={players.playerO} type="O" />
		</div>
	);
};
export default PlayerArea;
