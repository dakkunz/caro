import { SOCKET_TYPES } from "@/constants/socketTypes";
import useSocket from "@/hooks/useSocket";
import { Modal, Spin } from "antd";
import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.scss";

const QuickPlayModal = ({ show, hide }) => {
	const socket = useSocket();

	useEffect(() => {
		if (show) {
			socket.emit(SOCKET_TYPES.FIND_MATCH);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show]);

	return (
		<Modal
			title="Finding Match..."
			centered
			onCancel={() => {
				// socket.emit(SOCKET_TYPES.STOP_FIND_MATCH);
				hide();
			}}
			maskClosable={false}
			width={300}
			visible={show}
			okButtonProps={{ hidden: true }}
			cancelButtonProps={{ type: "primary" }}
		>
			<div className="quick-play-modal-loading-wrapper">
				<Spin
					indicator={<LoadingOutlined className="loading-icon" />}
					tip="Finding Match..."
				/>
			</div>
		</Modal>
	);
};
export default QuickPlayModal;
