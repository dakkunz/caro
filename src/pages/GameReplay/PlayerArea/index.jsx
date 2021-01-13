import PlayerSingle from "@/pages/GameReplay/PlayerSingle";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const PlayerArea = () => {
	const {
		data: { xPlayer, oPlayer },
	} = useSelector((state) => state.gameReplay);

	return (
		<div className="player-area-wrapper">
			<PlayerSingle isPlayerX player={xPlayer} />
			<PlayerSingle player={oPlayer} />
		</div>
	);
};

export default PlayerArea;
