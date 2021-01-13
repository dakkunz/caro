import { SOCKET_TYPES } from "@/constants/socketTypes";
import useSocket from "@/hooks/useSocket";
import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const JoinRoomModal = ({ show, hide }) => {
	const socket = useSocket();
	const [form] = Form.useForm();
	const { list } = useSelector((state) => state.roomList);
	return (
		<Modal
			title="Vào phòng chơi"
			centered
			width={400}
			closable
			onCancel={hide}
			visible={show}
			onOk={() => {
				form.submit();
			}}
		>
			<Form
				initialValues={{}}
				form={form}
				onFinish={({ roomId, password }) => {
					const rooms = list.filter((room) => room.id.toString() === roomId);
					console.log({ rooms, list });
					if (rooms.length) {
						const room = rooms[0];
						if (!room.password) {
							socket.emit(SOCKET_TYPES.JOIN_ROOM_REQUEST, room.id);
						} else {
							if (room.password === password) {
								socket.emit(SOCKET_TYPES.JOIN_ROOM_REQUEST, room.id, password);
							} else message.error("Sai mật khẩu");
						}
					} else message.error("Phòng không tồn tại");
				}}
				layout="vertical"
			>
				<Form.Item name="roomId" rules={[{ required: true }]} label="ID Phòng">
					<Input />
				</Form.Item>
				<Form.Item name="password" label="Mật khẩu">
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default JoinRoomModal;
