import { ArrowLeftOutlined, SmileOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./style.scss";

const ActionArea = () => (
	<div className="action-area-wrapper">
		<Button danger type="primary">
			<ArrowLeftOutlined />
			Leave Room
		</Button>
		<Button type="primary">
			<SmileOutlined />
			Play
		</Button>
	</div>
);
export default ActionArea;
