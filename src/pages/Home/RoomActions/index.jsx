import { PlusCircleTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./style.scss";

const RoomActions = () => (
	<div className="room-actions-wrapper">
		<Button>
			<SmileTwoTone />
			Quick Play
		</Button>
		<Button>
			<PlusCircleTwoTone />
			Create Room
		</Button>
	</div>
);
export default RoomActions;
