// libs
import React from "react";
import { Popover } from "antd";
// components
import OnlineUserList from "@/components/FloatButton/mains/OnlineUserList";
// others
import "./styles.scss";

const FloatButtonPopup = ({ children }) => (
	<Popover
		className="float-button-popup-wrapper"
		content={<OnlineUserList />}
		placement="topRight"
		trigger="click"
		title="Current User"
	>
		{children}
	</Popover>
);
export default FloatButtonPopup;
