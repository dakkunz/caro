import { Tag } from "antd";
import React from "react";

const roomStatusMapping = {
	0: {
		label: "Playing",
		color: "green",
	},
	1: {
		label: "Waiting Player",
		color: "blue",
	},
	2: {
		label: "Pending Start",
		color: "magenta",
	},
};

const RoomStatus = ({ status }) => (
	<div className="room-status-wrapper">
		<Tag color={roomStatusMapping[status].color}>
			{roomStatusMapping[status].label}
		</Tag>
	</div>
);
export default RoomStatus;
