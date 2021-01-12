import { Tag } from "antd";
import React from "react";

const roomStatusMapping = {
	0: {
		label: "Đang chơi",
		color: "magenta",
	},
	1: {
		label: "Đang chờ",
		color: "green",
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
