// libs
import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
// components
import OnlineUserList from "@/components/FloatButton/OnlineUserList";
// others
import "./styles.scss";
import useOnlineListener from "@/hooks/useOnlineListener";

const FloatButton = () => {
	const [show, setShow] = useState(false);
	const { list } = useOnlineListener();
	return (
		<>
			<Button
				className="float-button-wrapper"
				type="primary"
				shape="circle"
				size="large"
				icon={<SmileOutlined />}
				onClick={() => setShow(true)}
			/>
			<Drawer
				width={400}
				title={`Online User (${list.length})`}
				placement="left"
				closable
				onClose={() => setShow(false)}
				visible={show}
			>
				<OnlineUserList />
			</Drawer>
		</>
	);
};
export default FloatButton;
