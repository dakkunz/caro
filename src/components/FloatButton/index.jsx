// libs
import { Button } from "antd";
import React from "react";
import { SmileOutlined } from "@ant-design/icons";
// components
import FloatButtonPopup from "@/components/FloatButton/mains/FloatButtonPopup";
// others
import "./styles.scss";

const FloatButton = () => (
	<FloatButtonPopup>
		<Button
			className="float-button-wrapper"
			type="primary"
			shape="circle"
			size="large"
			icon={<SmileOutlined />}
		/>
	</FloatButtonPopup>
);
export default FloatButton;
