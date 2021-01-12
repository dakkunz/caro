import { TrophyOutlined } from "@ant-design/icons";
import { Avatar, Card, Progress, Tag } from "antd";
import React from "react";
import "./style.scss";

const PlayerPlace = ({ player, type }) => (
	<Card type="inner" className="player-place-wrapper" title={`Player ${type}`}>
		{player && (
			<div className="card-body">
				<Avatar shape="circle" src={player.picture} size={100} />
				<div className="name">{player.displayName}</div>
				<div className="trophy">
					<TrophyOutlined /> <span>{player.trophy.point}</span>
				</div>
				<div className="rate">
					<Progress
						type="circle"
						status="active"
						percent={
							((player.trophy.win + player.trophy.draw) / player.trophy.total) *
							100
						}
						success={{
							percent: (player.trophy.win / player.trophy.total) * 100,
						}}
						format={(percent, successPercent) => (
							<span style={{ fontSize: 16 }}>
								{Math.round(successPercent)}%<br />
								Tỉ lệ thắng
							</span>
						)}
						trailColor="#ff4d4f"
						width={100}
					/>
				</div>
				<div className="count">
					<Tag color="cyan">{player.trophy.total} trận</Tag>
				</div>
				<div className="count">
					<Tag color="#87d068">{player.trophy.win} Thắng</Tag>
					<Tag color="#108ee9">{player.trophy.draw} Hòa</Tag>
					<Tag color="#ff4d4f">{player.trophy.lost} Thua</Tag>
				</div>
			</div>
		)}
	</Card>
);

export default PlayerPlace;
