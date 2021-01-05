import { LockOutlined } from "@ant-design/icons";
import React from "react";

import "./style.scss";

const RoomName = ({ roomName, hasPassword }) => (
	<div className="room-name-wrapper">
		<div>{roomName}</div>
		{hasPassword && <LockOutlined />}
	</div>
);
export default RoomName;
