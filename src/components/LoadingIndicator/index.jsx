// libs
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
// components
// others
import "./styles.scss";

const LoadingIndicator = () => (
	<div className="loading-indicator-wrapper">
		<Spin
			indicator={<LoadingOutlined className="loading-icon" />}
			tip="...Đang tải"
		/>
	</div>
);
export default LoadingIndicator;
