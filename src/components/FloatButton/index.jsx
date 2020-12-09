// libs
import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
// components
import OnlineUserList from "@/components/FloatButton/mains/OnlineUserList";
// others
import "./styles.scss";

const FloatButton = () => {
	const [show, setShow] = useState(false);
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
				title="Online User"
				placement="left"
				closable={false}
				onClose={() => setShow(false)}
				visible={show}
			>
				<OnlineUserList />
			</Drawer>
		</>
	);
};
export default FloatButton;
