import { TrophyOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import "./style.scss";

const PlayerPlace = ({ player, type }) => (
	<Card className="player-place-wrapper" title={`Player ${type}`}>
		<div className="card-body">
			<img alt="ava" className="player-ava" src={player.picture} />
			<div className="player-desc">
				<div>{player.nickname}</div>
				<div>
					<TrophyOutlined /> <span>555</span>
				</div>
			</div>
		</div>
	</Card>
);

export default PlayerPlace;
