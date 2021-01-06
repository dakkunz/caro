import PlayerPlace from "@/pages/Room/PlayerPlace";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const PlayerArea = () => {
	const { roomInfo } = useSelector((state) => state.room);
	const { players: { X: playerX, O: playerO } = {} } = roomInfo || {};
	return (
		<div className="players-area-wrapper">
			<PlayerPlace player={playerX} type="X" />
			<PlayerPlace player={playerO} type="O" />
		</div>
	);
};
export default PlayerArea;
