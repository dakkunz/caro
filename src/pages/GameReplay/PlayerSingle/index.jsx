import { playerColorMapping } from "@/pages/GameReplay/mapping";
import { Avatar, Tag } from "antd";
import React from "react";
import "./style.scss";

const PlayerSingle = ({ isPlayerX = false, player }) => {
	const { picture, displayName } = player;
	return (
		<div className="player-single-wrapper">
			<Tag color={playerColorMapping[isPlayerX ? "X" : "O"]}>
				Người chơi {isPlayerX ? "X" : "O"}
			</Tag>
			<Avatar src={picture} size={100} />
			<h3>{displayName}</h3>
		</div>
	);
};

export default PlayerSingle;
