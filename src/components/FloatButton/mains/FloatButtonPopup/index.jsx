// libs
import React from "react";
import { Popover } from "antd";
// components
import OnlineUserList from "@/components/FloatButton/mains/OnlineUserList";
// hooks
import useOnlineListener from "@/hooks/useOnlineListener";
// others
import "./styles.scss";

const FloatButtonPopup = ({ children }) => {
	const { list } = useOnlineListener();
	return (
		<Popover
			className="float-button-popup-wrapper"
			content={<OnlineUserList />}
			placement="topRight"
			trigger="click"
			title={`Current User (${list.length})`}
		>
			{children}
		</Popover>
	);
};
export default FloatButtonPopup;
