import { SOCKET_TYPES } from "@/constants/socketTypes";
import useSocket from "@/hooks/useSocket";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Modal, Spin } from "antd";
import React, { useEffect } from "react";
import "./style.scss";

const QuickPlayModal = ({ show, hide }) => {
	const socket = useSocket();

	useEffect(() => {
		if (show) {
			socket.emit(SOCKET_TYPES.FIND_MATCH);
			socket.off("join-room-quick-fail");
			socket.on("join-room-quick-fail", () => {
				hide();
				message.error("Không tìm thấy người chơi khác!");
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show]);

	return (
		<Modal
			title="Tìm trận..."
			centered
			onCancel={() => {
				socket.emit(SOCKET_TYPES.STOP_FIND_MATCH);
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
					tip="Đang tìm trận..."
				/>
			</div>
		</Modal>
	);
};
export default QuickPlayModal;
