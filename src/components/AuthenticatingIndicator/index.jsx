// libs
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
// components
// others
import "./styles.scss";

const AuthenticatingIndicator = () => (
	<div className="authenticating-indicator-wrapper">
		<Spin
			indicator={<LoadingOutlined className="loading-icon" />}
			tip="...Authenticating"
		/>
	</div>
);
export default AuthenticatingIndicator;
